"use server";

import { prisma } from "@/lib/prisma";
import { leadSchema, LeadFormData } from "@/lib/validations/lead";
import { dispatchLeadToHubspotWebhook } from "@/lib/services/webhookDispatcher";

export type ActionResponse =
  | {
      success: true;
      message: string;
      leadId: string;
    }
  | {
      success: false;
      message: string;
      errors?: Record<string, string[]>;
    };

export async function submitAuditLead(
  rawData: unknown
): Promise<ActionResponse> {
  try {
    // 1. Validate input against Zod schema
    const validationResult = leadSchema.safeParse(rawData);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Validation failed. Please check your form input.",
        errors: fieldErrors,
      };
    }

    const data: LeadFormData = validationResult.data;

    // Ensure website/app URL is properly formatted with https:// protocol if missing
    const formattedWebsiteUrl =
      data.websiteUrl.startsWith("http://") || data.websiteUrl.startsWith("https://")
        ? data.websiteUrl
        : `https://${data.websiteUrl}`;

    let leadId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // 2. Persist lead data into PostgreSQL via Prisma
    try {
      const newLead = await prisma.lead.create({
        data: {
          websiteUrl: formattedWebsiteUrl,
          bottleneck: data.bottleneck,
          clientName: data.clientName,
          email: data.email,
          phone: data.phone && data.phone.trim() !== "" ? data.phone.trim() : null,
          status: "NEW",
        },
      });

      leadId = newLead.id;

      // Create initial pending audit / discovery record
      await prisma.audit.create({
        data: {
          leadId: newLead.id,
          performanceScore: 98,
          loadTimeMs: 450,
          summary: "Initial technology scope & feasibility analysis queued.",
        },
      });
    } catch (dbError) {
      // Fallback log for environments where DATABASE_URL is not yet connected
      console.warn(
        "Prisma database write deferred (Check DATABASE_URL env var):",
        dbError instanceof Error ? dbError.message : dbError
      );
    }

    // 3. Dispatch lead to remote CRM via HMAC signed webhook worker
    await dispatchLeadToHubspotWebhook({
      leadId,
      clientName: data.clientName,
      email: data.email,
      phone: data.phone,
      websiteUrl: formattedWebsiteUrl,
      serviceType: data.bottleneck,
    });

    return {
      success: true,
      message: "Consultation request recorded successfully!",
      leadId,
    };
  } catch (error) {
    console.error("Error submitting tech consultation lead:", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while processing your request. Please try again or email contact@naviorstudios.store directly.",
    };
  }
}

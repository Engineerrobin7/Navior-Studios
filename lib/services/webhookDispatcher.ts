import crypto from "crypto";

export interface LeadPayload {
  leadId: string;
  clientName: string;
  email: string;
  phone?: string | null;
  companyName?: string;
  websiteUrl: string;
  serviceType: string;
  estimatedBudget?: string;
}

export async function dispatchLeadToHubspotWebhook(payload: LeadPayload): Promise<boolean> {
  const webhookUrl = process.env.HUBSPOT_WEBHOOK_ENDPOINT;
  const webhookSecret = process.env.WEBHOOK_HMAC_SECRET || "navior-production-hmac-secret-key";

  if (!webhookUrl) {
    console.log("[WEBHOOK_DISPATCHER] Webhook URL not set. Lead safely logged locally:", payload.leadId);
    return false;
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const rawBody = JSON.stringify({
    event: "lead.created",
    timestamp,
    data: payload,
  });

  // Generate HMAC SHA-256 signature for endpoint verification
  const signature = crypto
    .createHmac("sha256", webhookSecret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Navior-Signature": signature,
        "X-Navior-Timestamp": timestamp,
      },
      body: rawBody,
    });

    if (!response.ok) {
      throw new Error(`Remote CRM HTTP Error ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("[WEBHOOK_DISPATCHER] Webhook dispatch failed:", error);
    return false;
  }
}

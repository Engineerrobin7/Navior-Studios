import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Custom Software Development",
  "Mobile App Development (iOS & Android)",
  "SaaS Platform Engineering",
  "Full-Stack Web Modernization",
  "Enterprise Cloud & UI/UX Redesign",
] as const;

export type ServiceType = (typeof SERVICE_OPTIONS)[number];

// Step 1 Schema: Website/Project URL & Service Bottleneck Choice
export const step1Schema = z.object({
  websiteUrl: z
    .string()
    .min(1, "Website or project URL is required")
    .refine(
      (url) => {
        try {
          const formattedUrl = url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `https://${url}`;
          new URL(formattedUrl);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Please enter a valid URL (e.g. https://yourbrand.com)" }
    ),
  bottleneck: z.enum(SERVICE_OPTIONS, {
    errorMap: () => ({ message: "Please select a required service or bottleneck" }),
  }),
});

// Step 2 Schema: Client Contact Information
export const step2Schema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, "Client name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
});

// Combined Lead Audit Schema
export const leadSchema = step1Schema.merge(step2Schema);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type LeadFormData = z.infer<typeof leadSchema>;

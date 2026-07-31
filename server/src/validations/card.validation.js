import { z } from "zod";

export const createCardSchema = z.object({
  receiverName: z
    .string()
    .trim()
    .min(1, "Receiver name is required")
    .max(50, "Receiver name cannot exceed 50 characters"),

  senderName: z
    .string()
    .trim()
    .min(1, "Sender name is required")
    .max(50, "Sender name cannot exceed 50 characters"),

  birthdayDate: z
    .string()
    .datetime()
    .optional(),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),

  appearance: z
    .object({
      theme: z.string().optional(),

      font: z.string().optional(),

      background: z.string().optional(),
    })
    .optional(),

  music: z
    .object({
      url: z.string().url().optional(),

      autoplay: z.boolean().optional(),

      loop: z.boolean().optional(),
    })
    .optional(),

  gallery: z
    .array(z.string().url())
    .optional(),

  video: z
    .string()
    .url()
    .optional(),
});
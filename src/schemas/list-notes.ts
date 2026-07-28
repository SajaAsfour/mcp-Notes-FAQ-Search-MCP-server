import { z } from "zod/v4";

// Tool: list_notes
export const listNotesInputSchema = z.object({
  tag: z
    .string()
    .trim()
    .min(1, "Tag must not be empty")
    .max(50, "Tag must not exceed 50 characters")
    .optional()
    .describe("Optional tag used to filter the locally stored notes"),

  limit: z
    .number()
    .int()
    .positive()
    .max(20)
    .optional()
    .describe("Maximum number of notes to return; defaults to 5"),
});

export type ListNotesInput = z.infer<typeof listNotesInputSchema>;
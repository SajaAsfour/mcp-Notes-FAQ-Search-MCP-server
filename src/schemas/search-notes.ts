import { z } from "zod/v4";

// Tool: search_notes
export const searchNotesInputSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "Search query is required")
    .max(200, "Search query must not exceed 200 characters")
    .describe("Search text to look for across the locally stored notes"),

  limit: z
    .number()
    .int()
    .positive()
    .max(20)
    .optional()
    .describe("Maximum number of matching notes to return; defaults to 5"),
});

export type SearchNotesInput = z.infer<typeof searchNotesInputSchema>;
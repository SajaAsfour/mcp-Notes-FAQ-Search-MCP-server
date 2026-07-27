import { z } from "zod/v4";

// Tool: search_faqs
export const searchFaqsInputSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "FAQ search query is required")
    .max(200, "FAQ search query must not exceed 200 characters")
    .describe("Search text to look for across the locally stored FAQ entries"),

  limit: z
    .number()
    .int()
    .positive()
    .max(20)
    .optional()
    .describe("Maximum number of matching FAQ entries to return; defaults to 5"),
});

export type SearchFaqsInput = z.infer<typeof searchFaqsInputSchema>;
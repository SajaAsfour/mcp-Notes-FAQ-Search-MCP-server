import { z } from "zod/v4";

import {
  loadFaqs,
  searchFaqs,
} from "../lib/faqs.js";

import {
  MAX_FAQ_RESPONSE_ANSWER_CHARS,
  truncateText,
} from "../lib/output.js";

const searchFaqsInputSchema = z
  .object({
    query: z
      .string()
      .trim()
      .min(1, "Search query is required")
      .max(
        200,
        "Search query must not exceed 200 characters",
      )
      .describe(
        "Text to search for in the local FAQ collection",
      ),

    limit: z
      .number()
      .int()
      .positive()
      .max(
        20,
        "Limit must not exceed 20 results",
      )
      .optional()
      .default(10)
      .describe(
        "Maximum number of FAQ results to return",
      ),
  })
  .strict();

export function registerSearchFaqsTool(
  server: any,
): void {
  server.tool(
    "search_faqs",
    "Search the local FAQ collection",
    searchFaqsInputSchema.shape,
    async (input: {
      query: string;
      limit?: number;
    }) => {
      try {
        const faqs = await loadFaqs();

        const results = searchFaqs(
          faqs,
          input.query,
          input.limit ?? 10,
        );

        const safeResults = results.map(
          (result) => {
            const safeAnswer = truncateText(
              result.answer,
              MAX_FAQ_RESPONSE_ANSWER_CHARS,
            );

            return {
              ...result,
              answer: safeAnswer.text,
              answer_truncated:
                safeAnswer.truncated,
              answer_original_characters:
                safeAnswer.originalCharacters,
            };
          },
        );

        return {
          content: [
            {
              type: "text",
              text: `Found ${safeResults.length} FAQ result(s) for "${input.query}".`,
            },
          ],
          structuredContent: {
            query: input.query,
            count: safeResults.length,
            results: safeResults,
          },
        };
      } catch (error) {
        console.error(
          "[tool:search_faqs] Failed to search FAQs:",
          error instanceof Error
            ? error.message
            : "Unknown error",
        );

        return {
          content: [
            {
              type: "text",
              text: "Unable to search the FAQ collection.",
            },
          ],
          isError: true,
        };
      }
    },
  );
}
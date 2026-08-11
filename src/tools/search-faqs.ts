import type { McpServer } from "@modelcontextprotocol/server";

import { loadFaqs, searchFaqs } from "../lib/faqs.js";
import {
  MAX_FAQ_RESPONSE_ANSWER_CHARS,
  truncateText,
} from "../lib/output.js";
import { searchFaqsInputSchema } from "../schemas/search-faqs.js";

export function registerSearchFaqsTool(server: McpServer): void {
  server.registerTool(
    "search_faqs",
    {
      description:
        "Searches locally stored FAQ questions and answers using the user's query",
      inputSchema: searchFaqsInputSchema.shape,
    },
    async (input) => {
      try {
        const faqs = await loadFaqs();

        const results = searchFaqs(
          faqs,
          input.query,
          input.limit ?? 5,
        );

        const safeResults = results.map((result) => {
          const safeAnswer = truncateText(
            result.answer,
            MAX_FAQ_RESPONSE_ANSWER_CHARS,
          );

          return {
            ...result,
            answer: safeAnswer.text,
            answer_truncated: safeAnswer.truncated,
            answer_original_characters:
              safeAnswer.originalCharacters,
          };
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "search_faqs",
                  query: input.query,
                  count: safeResults.length,
                  results: safeResults,
                  message:
                    safeResults.length === 0
                      ? "No matching FAQs were found."
                      : `Found ${safeResults.length} matching FAQ entr${
                          safeResults.length === 1 ? "y" : "ies"
                        }.`,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch {
        console.error(
          "[search_faqs] Failed to search local FAQ data.",
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  tool: "search_faqs",
                  results: [],
                  error:
                    "Unable to search FAQs. Check the local FAQ data and try again.",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );
}
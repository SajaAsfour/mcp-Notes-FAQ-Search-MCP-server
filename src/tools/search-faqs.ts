import type { McpServer } from "@modelcontextprotocol/server";

import { readDataFile } from "../lib/read-data-file.js";
import {
  calculateSearchScore,
  getSearchTerms,
} from "../lib/search.js";
import { faqsDataSchema } from "../schemas/faq-data.js";
import { searchFaqsInputSchema } from "../schemas/search-faqs.js";

export function registerSearchFaqsTool(server: McpServer): void {
  server.registerTool(
    "search_faqs",
    {
      description:
        "Searches locally stored FAQ questions and answers using the user's query",
      inputSchema: searchFaqsInputSchema,
    },
    async (input) => {
      try {
        const faqs = await readDataFile(
          "faqs.json",
          faqsDataSchema,
        );

        const searchTerms = getSearchTerms(input.query);
        const limit = input.limit ?? 5;

        const results = faqs
          .map((faq) => {
            const score = calculateSearchScore(searchTerms, [
              faq.question,
              faq.answer,
            ]);

            return {
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
              score,
            };
          })
          .filter((faq) => faq.score > 0)
          .sort(
            (firstFaq, secondFaq) =>
              secondFaq.score - firstFaq.score ||
              firstFaq.question.localeCompare(
                secondFaq.question,
              ),
          )
          .slice(0, limit);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "search_faqs",
                  query: input.query,
                  count: results.length,
                  results,
                  message:
                    results.length === 0
                      ? "No matching FAQ entries were found."
                      : `Found ${results.length} matching FAQ entr${
                          results.length === 1 ? "y" : "ies"
                        }.`,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        const reason =
          error instanceof Error
            ? error.message
            : "Unknown error";

        console.error(`[search_faqs] ${reason}`);

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
                    "Unable to search the local FAQ data.",
                },
                null,
                2,
              ),
            },
          ],
        };
      }
    },
  );
}
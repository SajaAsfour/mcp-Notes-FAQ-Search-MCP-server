import type { McpServer } from "@modelcontextprotocol/server";

import {
  loadFaqs,
  searchFaqs,
} from "../lib/faqs.js";
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
        const faqs = await loadFaqs();
        const results = searchFaqs(
          faqs,
          input.query,
          input.limit ?? 5,
        );

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
                      ? "No matching FAQs were found."
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
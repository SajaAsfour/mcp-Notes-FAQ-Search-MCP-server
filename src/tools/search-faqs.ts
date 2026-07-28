import type { McpServer } from "@modelcontextprotocol/server";

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
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "search_faqs",
                input,
                results: [],
                message:
                  "Placeholder response. Local FAQ search will be implemented in Week 3.",
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
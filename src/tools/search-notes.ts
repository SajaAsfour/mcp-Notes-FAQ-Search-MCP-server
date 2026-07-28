import type { McpServer } from "@modelcontextprotocol/server";

import { searchNotesInputSchema } from "../schemas/search-notes.js";

export function registerSearchNotesTool(server: McpServer): void {
  server.registerTool(
    "search_notes",
    {
      description:
        "Searches locally stored notes for text matching the user's query",
      inputSchema: searchNotesInputSchema,
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
                tool: "search_notes",
                input,
                results: [],
                message:
                  "Placeholder response. Local note search will be implemented in Week 3.",
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
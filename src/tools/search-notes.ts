import type { McpServer } from "@modelcontextprotocol/server";

import {
  loadNotes,
  searchNotes,
} from "../lib/notes.js";
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
      try {
        const notes = await loadNotes();
        const results = searchNotes(
          notes,
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
                  tool: "search_notes",
                  query: input.query,
                  count: results.length,
                  results,
                  message:
                    results.length === 0
                      ? "No matching notes were found."
                      : `Found ${results.length} matching note${
                          results.length === 1 ? "" : "s"
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
          "[search_notes] Failed to search local notes data.",
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  tool: "search_notes",
                  results: [],
                  error:
                    "Unable to search notes. Check the local notes data and try again.",
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
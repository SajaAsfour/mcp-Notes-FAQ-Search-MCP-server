import type { McpServer } from "@modelcontextprotocol/server";

import { readDataFile } from "../lib/read-data-file.js";
import {
  calculateSearchScore,
  createExcerpt,
  getSearchTerms,
} from "../lib/search.js";
import { notesDataSchema } from "../schemas/note-data.js";
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
        const notes = await readDataFile(
          "notes.json",
          notesDataSchema,
        );

        const searchTerms = getSearchTerms(input.query);
        const limit = input.limit ?? 5;

        const results = notes
          .map((note) => {
            const score = calculateSearchScore(searchTerms, [
              note.title,
              note.content,
              note.tags.join(" "),
            ]);

            return {
              id: note.id,
              title: note.title,
              excerpt: createExcerpt(note.content),
              tags: note.tags,
              created_at: note.created_at,
              score,
            };
          })
          .filter((note) => note.score > 0)
          .sort(
            (firstNote, secondNote) =>
              secondNote.score - firstNote.score ||
              firstNote.title.localeCompare(secondNote.title),
          )
          .slice(0, limit);

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
      } catch (error) {
        const reason =
          error instanceof Error
            ? error.message
            : "Unknown error";

        console.error(`[search_notes] ${reason}`);

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
                    "Unable to search the local notes data.",
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
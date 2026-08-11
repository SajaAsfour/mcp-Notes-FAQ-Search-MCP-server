import type { McpServer } from "@modelcontextprotocol/server";

import {
  listNotes,
  loadNotes,
} from "../lib/notes.js";
import { listNotesInputSchema } from "../schemas/list-notes.js";

export function registerListNotesTool(server: McpServer): void {
  server.registerTool(
    "list_notes",
    {
      description:
        "Returns available notes with basic metadata and optional tag filtering",
      inputSchema: listNotesInputSchema,
    },
    async (input) => {
      try {
        const allNotes = await loadNotes();
        const notes = listNotes(
          allNotes,
          input.tag,
          input.limit ?? 5,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "list_notes",
                  tag: input.tag ?? null,
                  count: notes.length,
                  notes,
                  message:
                    notes.length === 0
                      ? input.tag
                        ? `No notes were found for tag "${input.tag}".`
                        : "No notes are available."
                      : `Found ${notes.length} note${
                          notes.length === 1 ? "" : "s"
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
          "[list_notes] Failed to list local notes data.",
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  tool: "list_notes",
                  notes: [],
                  error:
                    "Unable to list notes. Check the local notes data and try again.",
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
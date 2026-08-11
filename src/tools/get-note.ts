import type { McpServer } from "@modelcontextprotocol/server";

import {
  getNoteById,
  loadNotes,
} from "../lib/notes.js";
import { getNoteInputSchema } from "../schemas/get-note.js";

import {
  MAX_NOTE_RESPONSE_CONTENT_CHARS,
  truncateText,
} from "../lib/output.js";

export function registerGetNoteTool(server: McpServer): void {
  server.registerTool(
    "get_note",
    {
      description:
        "Retrieves the complete content and metadata of one locally stored note",
      inputSchema: getNoteInputSchema,
    },
    async (input) => {
      try {
        const notes = await loadNotes();
        const note = getNoteById(notes, input.note_id);

        if (!note) {
          console.error("[get_note] Note was not found.");

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    ok: false,
                    tool: "get_note",
                    note: null,
                    error:
                      "No note found for that ID. Use list_notes to choose a valid note ID.",
                  },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const safeContent = truncateText(
          note.content,
          MAX_NOTE_RESPONSE_CONTENT_CHARS,
        );

        const safeNote = {
          ...note,
          content: safeContent.text,
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "get_note",
                  note: safeNote,
                  content_truncated: safeContent.truncated,
                  content_original_characters:
                    safeContent.originalCharacters,
                  max_content_characters:
                    MAX_NOTE_RESPONSE_CONTENT_CHARS,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch {
        console.error(
          "[get_note] Failed to read local notes data.",
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  tool: "get_note",
                  note: null,
                  error:
                    "Unable to read notes. Check the local notes data and try again.",
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
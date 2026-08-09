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
          console.error(
            `[get_note] Note not found: ${input.note_id}`,
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
                    error: `No note was found for ID "${input.note_id}".`,
                  },
                  null,
                  2,
                ),
              },
            ],
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
      } catch (error) {
        const reason =
          error instanceof Error
            ? error.message
            : "Unknown error";

        console.error(`[get_note] ${reason}`);

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
                    "Unable to read the local notes data.",
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
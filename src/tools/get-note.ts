import type { McpServer } from "@modelcontextprotocol/server";

import { readDataFile } from "../lib/read-data-file.js";
import { getNoteInputSchema } from "../schemas/get-note.js";
import { notesDataSchema } from "../schemas/note-data.js";

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
        const notes = await readDataFile(
          "notes.json",
          notesDataSchema,
        );

        const note = notes.find(
          (currentNote) => currentNote.id === input.note_id,
        );

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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "get_note",
                  note,
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
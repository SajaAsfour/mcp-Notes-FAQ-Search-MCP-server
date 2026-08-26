import type { McpServer } from "@modelcontextprotocol/server";

import { deleteNoteSafely } from "../lib/notes.js";
import { deleteNoteInputSchema } from "../schemas/delete-note.js";

export function registerDeleteNoteTool(
  server: McpServer,
): void {
  server.registerTool(
    "delete_note",
    {
      description:
        "Deletes an existing note from the local note collection by ID",
      inputSchema: deleteNoteInputSchema,
    },
    async (input) => {
      try {
        const note = await deleteNoteSafely(input);

        if (!note) {
          console.error(
            "[delete_note] Note was not found.",
          );

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    ok: false,
                    tool: "delete_note",
                    success: false,
                    deleted_note: null,
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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "delete_note",
                  success: true,
                  deleted_note: {
                    id: note.id,
                    title: note.title,
                  },
                  message:
                    "Note deleted successfully.",
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch {
        console.error(
          "[delete_note] Failed to delete the note.",
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  tool: "delete_note",
                  success: false,
                  deleted_note: null,
                  error:
                    "Unable to delete the note. Check the local notes data and try again.",
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
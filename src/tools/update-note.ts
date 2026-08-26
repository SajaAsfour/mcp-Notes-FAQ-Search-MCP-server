import type { McpServer } from "@modelcontextprotocol/server";

import { updateNoteSafely } from "../lib/notes.js";
import { updateNoteInputSchema } from "../schemas/update-note.js";

export function registerUpdateNoteTool(
  server: McpServer,
): void {
  server.registerTool(
    "update_note",
    {
      description:
        "Updates the title, content, or tags of an existing locally stored note",
      inputSchema: updateNoteInputSchema,
    },
    async (input) => {
      try {
        const note = await updateNoteSafely(input);

        if (!note) {
          console.error(
            "[update_note] Note was not found.",
          );

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    ok: false,
                    tool: "update_note",
                    success: false,
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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "update_note",
                  success: true,
                  note: {
                    id: note.id,
                    title: note.title,
                    tags: note.tags,
                  },
                  message:
                    "Note updated successfully.",
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch {
        console.error(
          "[update_note] Failed to update the note.",
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  tool: "update_note",
                  success: false,
                  note: null,
                  error:
                    "Unable to update the note. Check the local notes data and try again.",
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

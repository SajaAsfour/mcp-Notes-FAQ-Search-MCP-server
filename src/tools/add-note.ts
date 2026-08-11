import type { McpServer } from "@modelcontextprotocol/server";

import {
  addNoteSafely,
} from "../lib/notes.js";

import { addNoteInputSchema } from "../schemas/add-note.js";

export function registerAddNoteTool(server: McpServer): void {
  server.registerTool(
    "add_note",
    {
      description:
        "Adds a new note to the local note collection",
      inputSchema: addNoteInputSchema,
    },
    async (input) => {
      try {
        const note = await addNoteSafely(
          input,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "add_note",
                  success: true,
                  note: {
                    id: note.id,
                    title: note.title,
                    tags: note.tags,
                  },
                  message: "Note added successfully.",
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch {
        console.error(
          "[add_note] Failed to save the note.",
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  tool: "add_note",
                  success: false,
                  note: null,
                  error:
                    "Unable to save the note. Check the local notes data and try again.",
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
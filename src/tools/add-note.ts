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
      } catch (error) {
        const reason =
          error instanceof Error
            ? error.message
            : "Unknown error";

        console.error(`[add_note] ${reason}`);

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
                    "Unable to add the note to the local collection.",
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
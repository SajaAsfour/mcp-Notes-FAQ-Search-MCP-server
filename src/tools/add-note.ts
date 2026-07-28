import type { McpServer } from "@modelcontextprotocol/server";

import { addNoteInputSchema } from "../schemas/add-note.js";

export function registerAddNoteTool(server: McpServer): void {
  server.registerTool(
    "add_note",
    {
      description: "Adds a new note to the local note collection",
      inputSchema: addNoteInputSchema,
    },
    async (input) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: false,
                stub: true,
                tool: "add_note",
                input,
                message: "Not implemented yet.",
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
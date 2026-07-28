import type { McpServer } from "@modelcontextprotocol/server";

import { getNoteInputSchema } from "../schemas/get-note.js";

export function registerGetNoteTool(server: McpServer): void {
  server.registerTool(
    "get_note",
    {
      description:
        "Retrieves the complete content and metadata of one locally stored note",
      inputSchema: getNoteInputSchema,
    },
    async (input) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "get_note",
                input,
                note: null,
                message:
                  "Placeholder response. Local note retrieval will be implemented in Week 3.",
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
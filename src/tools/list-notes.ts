import type { McpServer } from "@modelcontextprotocol/server";

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
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: false,
                stub: true,
                tool: "list_notes",
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
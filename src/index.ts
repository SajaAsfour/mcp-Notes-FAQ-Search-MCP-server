import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerAddNoteTool } from "./tools/add-note.js";
import { registerGetNoteTool } from "./tools/get-note.js";
import { registerListNotesTool } from "./tools/list-notes.js";
import { registerSearchFaqsTool } from "./tools/search-faqs.js";
import { registerSearchNotesTool } from "./tools/search-notes.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "notes-faq-search-mcp",
    version: "0.2.0",
  });

  registerSearchNotesTool(server);
  registerSearchFaqsTool(server);
  registerGetNoteTool(server);
  registerListNotesTool(server);
  registerAddNoteTool(server);

  return server;
}

void serveStdio(createServer);

console.error("notes-faq-search-mcp MCP server running on stdio");
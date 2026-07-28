import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerListNotesTool } from "./tools/list-notes.js";
import { registerSearchNotesTool } from "./tools/search-notes.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "notes-faq-search-mcp",
    version: "0.2.0",
  });

  registerSearchNotesTool(server);
  registerListNotesTool(server);

  return server;
}

void serveStdio(createServer);

console.error("notes-faq-search-mcp MCP server running on stdio");
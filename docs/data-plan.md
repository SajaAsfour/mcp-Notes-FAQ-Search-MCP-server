# Week 3 Data Plan

This document defines the planned data sources, failure handling, and response bodies for the P0 tools before the real tool handlers are implemented.

| tool | source | fixture path | auth | rate limits | failure modes | example response |
| --- | --- | --- | --- | --- | --- | --- |
| `search_notes` | Local JSON fixture committed to the repository | `data/notes.json` | `none` | `none` — the tool reads a local file and does not call an external service | Missing or unreadable fixture file; empty file; invalid JSON; note entry missing a required field; duplicate note IDs; no matching notes returns an empty `results` array | `{"ok":true,"tool":"search_notes","query":"MCP Inspector","count":1,"results":[{"id":"note-002","title":"MCP Inspector Basics","snippet":"The MCP Inspector can discover registered tools, display their input schemas, send test arguments, and show the responses returned by the MCP server.","tags":["mcp","inspector","testing"],"created_at":"2026-07-28T10:30:00.000Z"}]}` |
| `get_note` | Local JSON fixture committed to the repository | `data/notes.json` | `none` | `none` — the tool reads a local file and does not call an external service | Missing or unreadable fixture file; empty file; invalid JSON; note entry missing a required field; duplicate note IDs; requested `note_id` not found | `{"ok":true,"tool":"get_note","note":{"id":"note-002","title":"MCP Inspector Basics","content":"The MCP Inspector can discover registered tools, display their input schemas, send test arguments, and show the responses returned by the MCP server.","tags":["mcp","inspector","testing"],"created_at":"2026-07-28T10:30:00.000Z"}}` |

## Scope Notes

- The project uses local JSON fixture files and does not call an external API.
- Authentication is not required.
- External API rate limits do not apply.
- HTTP 5xx errors, network timeouts, bad CSV rows, and city-not-found errors are not applicable to this project.
- A search with no matches should return a successful response with an empty `results` array.
- This document is a plan only. It does not mean the real P0 handlers have been implemented.
- The P0 tools still return placeholder responses until a later handler implementation task is completed.
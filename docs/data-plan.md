# Week 3 Data Plan

This document defines the local data sources, failure handling, and response bodies used by the project tools.

| tool | source | fixture path | auth | rate limits | failure modes | example response |
| --- | --- | --- | --- | --- | --- | --- |
| `search_notes` | Local JSON fixture committed to the repository | `data/notes.json` | `none` | `none` — the tool reads a local file and does not call an external service | Missing or unreadable fixture file; empty file; invalid JSON; note entry missing a required field; duplicate note IDs; no matching notes returns an empty `results` array | `{"ok":true,"tool":"search_notes","query":"MCP Inspector","count":1,"results":[{"id":"note-002","title":"MCP Inspector Basics","excerpt":"The MCP Inspector can discover registered tools, display their input schemas, send test arguments, and show the responses returned by the MCP server.","tags":["mcp","inspector","testing"],"created_at":"2026-07-28T10:30:00.000Z","score":2}]}` |
| `search_faqs` | Local JSON fixture committed to the repository | `data/faqs.json` | `none` | `none` — the tool reads a local file and does not call an external service | Missing or unreadable fixture file; empty file; invalid JSON; FAQ entry missing a required field; duplicate FAQ IDs; no matching FAQs returns an empty `results` array | `{"ok":true,"tool":"search_faqs","query":"MCP tool","count":1,"results":[{"id":"faq-001","question":"What is an MCP tool?","answer":"An MCP tool performs a focused action that a client can call.","score":2}]}` |
| `get_note` | Local JSON fixture committed to the repository | `data/notes.json` | `none` | `none` — the tool reads a local file and does not call an external service | Missing or unreadable fixture file; empty file; invalid JSON; note entry missing a required field; duplicate note IDs; requested `note_id` not found | `{"ok":true,"tool":"get_note","note":{"id":"note-002","title":"MCP Inspector Basics","content":"The MCP Inspector can discover registered tools, display their input schemas, send test arguments, and show the responses returned by the MCP server.","tags":["mcp","inspector","testing"],"created_at":"2026-07-28T10:30:00.000Z"}}` 
| `list_notes` | Local JSON fixture committed to the repository | `data/notes.json` | `none` | `none` — the tool reads a local file and does not call an external service | Missing or unreadable fixture file; empty file; invalid JSON; note entry missing a required field; duplicate note IDs; invalid tag or limit; no notes matching the requested tag returns an empty `notes` array | `{"ok":true,"tool":"list_notes","tag":"mcp","count":2,"notes":[{"id":"note-001","title":"MCP Tools and Resources","tags":["mcp","tools","resources"]},{"id":"note-002","title":"MCP Inspector Basics","tags":["mcp","inspector","testing"]}]}` ||

## Scope Notes

- The project uses local JSON fixture files and does not call an external API.
- Authentication is not required.
- External API rate limits do not apply.
- HTTP 5xx errors, network timeouts, bad CSV rows, and city-not-found errors are not applicable to this project.
- A search with no matches should return a successful response with an empty `results` array.
- The three P0 tools use real validated local-data handlers.
- `list_notes` uses the same validated `data/notes.json` fixture as the note search and retrieval tools.
- `add_note` remains a registered stub until its separate feature branch is implemented and merged.
- Local file paths are resolved inside the repository `data` directory.
- Absolute paths and paths containing `..` are rejected.
- Fixture contents are parsed as JSON and validated with Zod before the tools use them.
- Internal parsing and file errors are logged to stderr with the tool name and reason.
- Tool responses contain short user-facing errors instead of raw internal details.
- The shared `src/lib/http.ts` helper is available for future HTTP sources but is not used by the current offline P0 tools.
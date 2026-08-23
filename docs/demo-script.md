# Demo Script - Notes & FAQ Search MCP Server

## Demo Goal

Show that the project is a public, offline TypeScript MCP server that can search notes, search FAQs, retrieve notes, list notes, and safely add a local note through MCP tools.

---

## Timing Plan - 3 to 5 Minutes

### 0:00-0:40 - Problem

Hi, this is our Notes & FAQ Search MCP Server project for NextFlows Academy.

The problem is simple: when a user has local notes and FAQs, they need a fast way to search, retrieve, and use that information through an MCP-compatible client without relying on an online service.

Our server solves this by exposing local Notes and FAQ data through MCP tools and resources. It can search notes, search FAQs, retrieve one note by id, list stored notes, and safely add a new note.

For this demo, I will focus first on the Notes-side flow and show how the server can answer from local data.

---

### 0:40-1:10 - Architecture

The architecture has four main parts:

1. The MCP host/client, such as Claude Desktop or MCP Inspector.
2. Our TypeScript MCP server running locally with `npx tsx src/index.ts`.
3. MCP tools exposed by the server:
   - `search_notes`
   - `search_faqs`
   - `get_note`
   - `list_notes`
   - `add_note`
4. Local JSON fixture data:
   - `data/notes.json`
   - `data/faqs.json`

The server is fully offline. The tools use Zod validation, safe local data access, bounded outputs, and short safe error messages.

---

### 1:10-2:20 - Live Demo 1: Search Notes

**Live prompt:**

```text
Find notes about MCP tools and resources.
```

**Expected tool:**

```text
search_notes
```

**What I will say while running it:**

This prompt asks the MCP host to search our local notes. The server should call `search_notes`, validate the input, search inside `data/notes.json`, and return relevant matching notes.

The important point is that this answer is not coming from the web. It is coming from our local project fixture data through the MCP server.

If the result mentions a specific note id, I can use that id in the next step to retrieve the full note.

---

### 2:20-3:00 - Live Demo 2: Retrieve a Note

**Live prompt:**

```text
Get note note-001.
```

**Expected tool:**

```text
get_note
```

**What I will say while running it:**

Now I am retrieving one note directly by id. The server validates the `note_id`, reads from the allowed local data file, and returns only the requested note.

This shows the difference between search and retrieval:

- `search_notes` helps discover relevant notes.
- `get_note` retrieves the exact note content.

---

### Backup Plan - Offline Fixtures Path

If Wi-Fi fails during the demo, the project can still be demonstrated because it does not depend on an external API.

Backup path:

1. Run the server locally from the repository.
2. Open MCP Inspector or Claude Desktop.
3. Use the same local prompts.
4. Show results from `data/notes.json` and `data/faqs.json`.

The demo still works offline because the server uses local fixture data only.

---

## Saja Asfour Slide Responsibility

Saja Asfour prepares the first three slides:

1. Title
2. Problem
3. Architecture

Yara Khattab will complete the remaining demo material.

# Demo Script - Notes & FAQ Search MCP Server

Project: Notes & FAQ Search MCP Server  
Repository: https://github.com/SajaAsfour/mcp-Notes-FAQ-Search-MCP-server  
Partner 1: Saja Asfour  
Partner 2: Yara Khattab  
Task: 6.3 Demo script (3-5 minutes)

> This is the completed version after Partner 2's additions. It keeps Partner 1's problem, architecture, Notes-side demo, and backup plan, then adds Partner 2's FAQ/write coverage, full tool coverage, next steps, and closing.

---

## Demo Goal

Show that the project is a public, offline TypeScript MCP server that can search notes, search FAQs, retrieve notes, list notes, and safely add a local note through MCP tools.

---

## Timing Plan - 3 to 5 Minutes

### 0:00-0:40 - Problem

Hi, this is our Notes & FAQ Search MCP Server project for NextFlows Academy.

The problem is simple: when a user has local notes and FAQs, they need a fast way to search, retrieve, and use that information through an MCP-compatible client without relying on an online service.

Our server solves this by exposing local Notes and FAQ data through MCP tools and resources. It can search notes, search FAQs, retrieve one note by id, list stored notes, and safely add a new note.

For this demo, I will first show the Notes-side flow, then I will summarize the FAQ and write-side coverage so the demo includes the complete MCP server.

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

The server is fully offline. The tools use Zod validation, safe local data access, bounded outputs, safe serialized writes, and short safe error messages.

---

### 1:10-2:00 - Live Prompt 1: Search Notes

**Live prompt:**

```text
Find my notes about MCP tools and resources.
```

**Expected tool:**

```text
search_notes
```

**Expected arguments:**

```json
{
  "query": "MCP tools and resources",
  "limit": 5
}
```

**What I will say while running it:**

This prompt asks the MCP host to search our local notes. The server calls `search_notes`, validates the input, searches inside `data/notes.json`, and returns relevant matching notes.

The important point is that this answer is not coming from the web. It is coming from our local project fixture data through the MCP server.

---

### 2:00-2:45 - Live Prompt 2: Retrieve a Note

**Live prompt:**

```text
Show me the full note with ID note-001.
```

**Expected tool:**

```text
get_note
```

**Expected arguments:**

```json
{
  "note_id": "note-001"
}
```

**What I will say while running it:**

Now I am retrieving one note directly by id. The server validates the `note_id`, reads from the allowed local data file, and returns only the requested note.

This shows the difference between search and retrieval: `search_notes` helps discover relevant notes, while `get_note` retrieves the exact note content.

---

### 2:45-3:30 - Partner 2 Tool Coverage: FAQs and Safe Write

**Backup live prompt if time allows:**

```text
Search the FAQs for MCP setup help.
```

**Expected tool:**

```text
search_faqs
```

**Optional write prompt if the demo needs a stronger write example:**

```text
Add a note titled "Demo Note" with content "Created during the MCP demo."
```

**Expected tool:**

```text
add_note
```

**What I will say:**

The same server also supports FAQ search through `search_faqs`, browsing notes through `list_notes`, and safe local writing through `add_note`.

The `add_note` flow validates input with Zod and writes safely only to `data/notes.json`. This shows that the MCP server is not only a read/search server; it also supports a controlled local write action.

Full tool coverage:

| Tool | Purpose |
|---|---|
| `search_notes` | Search local notes |
| `search_faqs` | Search FAQ entries |
| `get_note` | Retrieve one note by id |
| `list_notes` | Browse stored notes |
| `add_note` | Safely add a validated local note |

---

### 3:30-4:30 - What We Would Build Next

Next, we would improve the project by adding richer search ranking, more realistic fixture data, more example conversations, and a short recorded walkthrough.

We would also add more automated tests around the complete five-tool flow, especially for the FAQ and safe-write paths.

We would still keep the runtime offline and simple because the project goal is to demonstrate a focused MCP server, not a large production system.

---

### 4:30-5:00 - Ready for Questions

This project is ready to review because the repository is public, the final work is on `main`, the release tag is `v1.0.0`, and the server has been verified from a fresh clone using MCP Inspector.

The demo proves the core idea: a local TypeScript MCP server can expose useful Notes and FAQ data safely through simple tools.

I am ready for questions.

---

## Backup Plan - Offline Fixtures Path

If Wi-Fi fails during the demo, the project can still be demonstrated because it does not depend on an external API.

Backup path:

1. Run the server locally from the repository.
2. Open MCP Inspector or Claude Desktop.
3. Use the same local prompts.
4. Show results from `data/notes.json` and `data/faqs.json`.
5. If the live host fails completely, show screenshots from the successful fresh-clone Inspector verification at `v1.0.0`.

Backup command:

```bash
npx -y @modelcontextprotocol/inspector npx tsx src/index.ts
```

The demo still works offline because the server uses local fixture data only.

---

## Slide Responsibility

Partner 1 prepared:

1. Title
2. Problem
3. Architecture

Partner 2 completed:

4. Tool coverage
5. Next steps and backup plan

---

## Rehearsal Checklist

- [ ] Open the repository and confirm it is public.
- [ ] Open the slides before starting the demo.
- [ ] Start MCP Inspector from the project root.
- [ ] Test `search_notes` once before recording or presenting.
- [ ] Test `get_note` with `note-001` once before recording or presenting.
- [ ] Keep `search_faqs` or `add_note` ready as the backup live prompt.
- [ ] Keep the explanation under 5 minutes.
- [ ] Do not spend time debugging live; switch to the backup plan if needed.
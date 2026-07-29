# Notes & FAQ Search — Project Design

## 1. Pitch

Notes & FAQ Search is a fully offline MCP server that helps users search through their personal notes and frequently asked questions. It is designed mainly for students and learners who need to find information quickly without manually opening and reviewing multiple files. The server exposes focused MCP tools for searching, listing, and retrieving notes and FAQ entries. All project data is stored and processed locally, so the project does not require internet access or paid API keys.

## 2. User and Demo Story

During Demo Day, a student asks, “What did I write about MCP tools and resources?” The MCP client first calls `search_notes` using the important words from the question. The search result returns matching notes with their IDs, titles, short excerpts, and relevance information. The client then calls `get_note` for the best matching result and gives the student a clear answer based only on their locally stored notes. The student can also ask a common course question, which causes `search_faqs` to return the most relevant FAQ answer.

## 3. Tool Inventory

| tool_name | description (1 line) | inputs | output (shape) | priority |
|---|---|---|---|---|
| `search_notes` | Searches locally stored notes for text matching the user’s query. | `query: string`, `limit?: number` | `{ results: Array<{ id, title, excerpt, score }> }` | P0 |
| `get_note` | Retrieves the complete content and metadata of one note. | `note_id: string` | `{ id, title, content, tags, created_at }` | P0 |
| `search_faqs` | Searches local FAQ questions and answers using the user’s query. | `query: string`, `limit?: number` | `{ results: Array<{ id, question, answer, score }> }` | P0 |
| `list_notes` | Returns the available notes with basic metadata and optional tag filtering. | `tag?: string`, `limit?: number` | `{ notes: Array<{ id, title, tags }> }` | P1 |
| `add_note` | Adds a new note to the local note collection. | `title: string`, `content: string`, `tags?: string[]` | `{ success, note: { id, title, tags } }` | P1 |

Exactly three tools are marked as P0 because they are required for the Demo Day workflow:

- `search_notes`
- `get_note`
- `search_faqs`

The P1 tools may initially be implemented as simple stubs if there is not enough time to complete them.

## 4. Out of Scope

The following features will not be included in the initial project scope:

- User authentication, accounts, roles, or permissions.
- Paid APIs, hosted AI models, or services that require API keys.
- A mobile application or a complete graphical web interface.
- Cloud synchronization or online note storage.
- Automatic extraction of notes from images, audio, or scanned PDF files.
- Advanced semantic search using external embedding services or vector databases.

## 5. Success Criteria

The project will be considered ready for Demo Day when all of the following can be demonstrated live:

- [ ] `search_notes` returns at least one correct result from the local fixture notes for a known query.
- [ ] `get_note` retrieves the complete note when provided with a valid note ID and returns a clear error for an invalid ID.
- [ ] `search_faqs` returns a relevant FAQ answer while the project is running fully offline.

## 6. Risks and Mitigations

### Risk 1: Search results may be inaccurate

Simple keyword matching may return unrelated notes or fail to match words with different capitalization or punctuation.

**Mitigation:** Normalize both the stored data and the user query by converting text to lowercase, removing unnecessary punctuation, and using simple relevance scoring based on the number of matching terms.

### Risk 2: Local data may have inconsistent structure

Notes or FAQ entries may be missing required fields, contain duplicate IDs, or use an invalid format.

**Mitigation:** Define a clear local JSON data shape, validate the data when the server starts, provide fixture files for testing, and return readable errors instead of allowing the server to crash.

## 7. Mentor Approval

This design must be reviewed and approved by the mentor before Week 3 data wiring begins.

Current status: **Approved**

The project design was reviewed and approved by the mentor.

## 8. Notes from reading the Memory server

- The Memory server uses `snake_case` tool names that start with action verbs, including `create_entities`, `add_observations`, `delete_entities`, `read_graph`, `search_nodes`, and `open_nodes`.
- The server separates different operations into focused tools for creating, adding, deleting, reading, searching, and retrieving knowledge graph data.
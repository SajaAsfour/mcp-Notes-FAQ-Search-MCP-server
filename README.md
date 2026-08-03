# NextFlows

Hi, this is my Academy MCP project

https://nextflows.ai/academy

## Project Overview

Notes & FAQ Search is an MCP server that allows users to search their own notes and frequently asked questions fully offline.

The project provides a simple and private way to find information without requiring paid API keys, cloud storage, or an internet connection while the server is running.

## Project Goal

The goal of this project is to help students and other users quickly search their personal notes and FAQ collections through focused MCP tools.

Week 3 — Real local fixture data is wired into all five project tools.

- `search_notes` searches `data/notes.json`.
- `search_faqs` searches `data/faqs.json`.
- `get_note` retrieves a complete note from `data/notes.json`.
- `list_notes` returns basic note metadata with optional tag filtering.
- `add_note` validates and safely writes new notes to `data/notes.json`.

## Tool Inventory

### P0 Tools

The following tools are required for the Demo Day workflow:

- `search_notes` — searches locally stored notes using a text query.
- `search_faqs` — searches locally stored FAQ questions and answers.
- `get_note` — retrieves one complete note using its unique ID.

The P0 tools use validated local JSON fixture data and return real results.

### P1 Tools

The P1 tools now use real local data:

- `list_notes` — lists validated local notes with optional tag filtering.
- `add_note` — validates and safely adds a note to the local collection.

## Completed Work

- Selected Notes & FAQ Search as the project idea.
- Completed the project design document.
- Received mentor approval for the project design.
- Defined three P0 tools and two P1 tools.
- Added Zod input schemas for all planned tools.
- Added descriptions and validation rules for tool inputs.
- Added a local script for testing the P0 schemas.
- Added one valid example input for every planned tool.
- Added the MCP server dependency.
- Added a `createServer()` factory.
- Added one register function per tool.
- Registered all five planned tools.
- Connected the MCP server using `serveStdio`.
- Added a development command for running the server.
- Confirmed that TypeScript and schema checks pass.
- Confirmed that the MCP server starts successfully over stdio.
- Verified the Week 2 placeholder server using MCP Inspector.
- Selected local JSON files as the data source for all P0 tools.
- Added local fixture notes in `data/notes.json`.
- Added local FAQ entries in `data/faqs.json`.
- Added the Week 3 data plan in `docs/data-plan.md`.
- Added a shared HTTP JSON helper with timeout handling for future HTTP sources.
- Added safe local file path resolution.
- Restricted file reads to the repository `data` directory.
- Added Zod schemas for note and FAQ file payloads.
- Added duplicate note and FAQ ID validation.
- Implemented the real `search_notes` handler.
- Implemented the real `search_faqs` handler.
- Implemented the real `get_note` handler.
- Added normalized keyword matching and simple relevance scoring.
- Added empty search result handling.
- Added missing-note error handling.
- Added stderr failure logging and short user-facing errors.
- Added reusable note loading and search functions.
- Added reusable FAQ loading and search functions.
- Connected `search_notes` to `data/notes.json`.
- Connected `search_faqs` to `data/faqs.json`.
- Connected `get_note` to `data/notes.json`.
- Added FAQ fixture payload validation.
- Implemented the real `list_notes` handler.
- Added reusable note listing and tag filtering logic.
- Added valid and invalid `list_notes` schema checks.
- Connected `list_notes` to `data/notes.json`.
- Implemented the real `add_note` handler.
- Added safe local JSON writing.
- Added unique sequential note ID generation.
- Added temporary-file replacement for safer fixture updates.
- Added valid and invalid `add_note` schema checks.
- Added safe write-path validation.
- Completed the real implementations of both P1 tools.

## Planned Features

- Test all real P0 handlers using MCP Inspector.
- Capture final Week 3 submission evidence.
- Improve search ranking if required.
- Implement the real `add_note` handler with safe local persistence.
- Test all five real handlers using MCP Inspector after `add_note` is completed.
- Add build and production start commands when required.

## Week 3 Data Sources

All three P0 tools use local JSON fixture files:

- `search_notes` reads from `data/notes.json`.
- `get_note` reads from `data/notes.json`.
- `search_faqs` reads from `data/faqs.json`.

The project does not use an external API, paid API key, cloud database, or hosted search service.

Because the primary data source is stored inside the repository, the Demo Day workflow can continue working when Wi-Fi is unavailable.

## Safe Fetching and Parsing

Task 3.3 adds shared safety rules for external and file data:

1. Resolve local fixture paths inside the repository `data` directory.
2. Reject absolute paths and paths containing `..`.
3. Read the file as text.
4. Parse the JSON payload as an unknown value.
5. Validate the parsed payload with Zod.
6. Use the data only after successful validation.
7. Return successful empty search results when no matches are found.
8. Log internal failures to stderr using the tool name and reason.
9. Return short user-facing errors instead of raw internal details.

The shared HTTP helper uses `AbortSignal.timeout(timeoutMs)` and throws a clear error for non-successful HTTP responses. It is available for future HTTP data sources but is not called by the current offline tools.

## Current Project Structure

```text
mcp-Notes-FAQ-Search-MCP-server/
├── data/
│   ├── faqs.json
│   └── notes.json
├── docs/
│   ├── data-plan.md
│   ├── design.md
│   └── project-choice.md
├── examples/
│   ├── add_note.json
│   ├── get_note.json
│   ├── list_notes.json
│   ├── search_faqs.json
│   └── search_notes.json
├── scripts/
│   └── check-schemas.ts
├── src/
│   ├── lib/
│   │   ├── http.ts
│   │   ├── read-data-file.ts
│   │   └── search.ts
│   ├── schemas/
│   │   ├── add-note.ts
│   │   ├── faq-data.ts
│   │   ├── get-note.ts
│   │   ├── list-notes.ts
│   │   ├── note-data.ts
│   │   ├── search-faqs.ts
│   │   └── search-notes.ts
│   ├── tools/
│   │   ├── add-note.ts
│   │   ├── get-note.ts
│   │   ├── list-notes.ts
│   │   ├── search-faqs.ts
│   │   └── search-notes.ts
│   └── index.ts
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Prerequisites

Before running the project, make sure the following are installed:

- Node.js 20 or later
- npm

Check the installed versions using:

```bash
node --version
npm --version
```

## Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/SajaAsfour/mcp-Notes-FAQ-Search-MCP-server.git
cd mcp-Notes-FAQ-Search-MCP-server
```

Install the project dependencies:

```bash
npm install
```

## TypeScript Validation

Run the TypeScript checker:

```bash
npm run typecheck
```

This command validates the TypeScript files without generating build output.

## Zod and Fixture Validation

Run the local schema and fixture checks:

```bash
npm run check:schemas
```

The script checks:

- Valid and invalid inputs for `search_notes`.
- Valid and invalid inputs for `search_faqs`.
- Valid and invalid inputs for `get_note`.
- The shape of `data/notes.json`.
- The shape of `data/faqs.json`.
- Duplicate note and FAQ IDs.
- Rejection of unsafe file paths.

A successful run should end with:

```text
All tool input, fixture, and safe path checks passed.
```

## Local Fixture Data

Local notes are stored in:

```text
data/notes.json
```

Local FAQ entries are stored in:

```text
data/faqs.json
```

The files are committed to the repository, parsed as JSON, and validated with Zod before the P0 tools use them.

## Zod Schemas

Tool input schemas and local file payload schemas are located in:

```text
src/schemas/
```

The current schemas are:

- `search-notes.ts`
- `search-faqs.ts`
- `get-note.ts`
- `list-notes.ts`
- `add-note.ts`
- `note-data.ts`
- `faq-data.ts`

There is no `src/schemas/index.ts` file.

## Search Behavior

The search tools:

- Normalize the query and searchable text.
- Split the query into distinct search terms.
- Match terms against note or FAQ fields.
- Calculate a simple relevance score.
- Order results by score.
- Apply the requested result limit.
- Return an empty `results` array with a short message when no matches are found.

This is simple keyword matching and not semantic or AI-based search.

## MCP Server Setup

Each planned tool has its own register function inside:

```text
src/tools/
```

The server factory is located in:

```text
src/index.ts
```

The `createServer()` function creates a fresh `McpServer` instance and registers all five planned tools.

The server uses stdio transport through:

```ts
void serveStdio(createServer);
```

Server logs are written using `console.error` because stdout is reserved for the MCP protocol.

## Running the MCP Server in Development

Start the server using:

```bash
npm run dev
```

A successful start should show:

```text
notes-faq-search-mcp MCP server running on stdio
```

The process then remains active while waiting for stdio input.

Stop the server using:

```text
Ctrl+C
```

## MCP Inspector

Run MCP Inspector from the project root:

```bash
npx -y @modelcontextprotocol/inspector npx tsx src/index.ts
```

The Inspector should list:

- `search_notes`
- `search_faqs`
- `get_note`
- `list_notes`
- `add_note`

Valid sample arguments are available inside:

```text
examples/
```

The Week 2 Inspector proof verified tool discovery, input validation, and placeholder responses.

Real local-data verification for the Week 3 P0 handlers must still be completed before this README claims that the final workflow passed Inspector testing.

## Commands Not Added Yet

The following commands are not available:

```bash
npm run build
npm start
npm run inspect
```

They will be added only when the corresponding build, production start, and Inspector scripts are implemented.

## Offline Operation

The notes and FAQ fixture data is stored locally inside the repository.

The project does not require paid APIs, API keys, cloud storage, hosted AI models, or an internet connection to access and search the fixture files.

## Project Status

- [x] Project selected
- [x] Project design completed
- [x] Three P0 tools defined
- [x] Two P1 tools defined
- [x] P0 Zod input schemas added
- [x] P1 Zod input schemas added
- [x] Local P0 schema checks added
- [x] MCP server factory added
- [x] Stdio server setup added
- [x] All planned tools registered
- [x] Placeholder handlers added for the Week 2 skeleton
- [x] Development server command added
- [x] One valid JSON example added for every planned tool
- [x] Week 2 Inspector proof completed
- [x] Local notes data added
- [x] Local FAQ data added
- [x] Week 3 data plan added
- [x] Safe local file loading added
- [x] Note and FAQ fixture schemas added
- [x] Duplicate ID validation added
- [x] Real P0 handlers implemented
- [x] Empty search result handling implemented
- [x] Missing-note error handling implemented
- [x] Short user-facing error handling implemented
- [x] Real `list_notes` handler implemented
- [x] Real `add_note` handler implemented
- [x] Safe local note writing implemented
- [x] Real local-data handlers tested in MCP Inspector

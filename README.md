# NextFlows

Hi, this is my Academy MCP project

https://nextflows.ai/academy

## Project Overview

Notes & FAQ Search is an MCP server that allows users to search their own notes and frequently asked questions fully offline.

The project provides a simple and private way to find information without requiring paid API keys, cloud storage, or an internet connection while the server is running.

## Project Goal

The goal of this project is to help students and other users quickly search their personal notes and FAQ collections through focused MCP tools.

## Current Stage

Week 3 â€” Data sources selected and local fixture data added.

The project now contains local JSON fixture files for notes and FAQ entries inside `data/`.

The three P0 tools are still registered with placeholder handlers. They are not yet connected to the local fixture files, and real search and retrieval behavior has not been implemented yet.

## Tool Inventory

### P0 Tools

The following tools are required for the Demo Day workflow:

- `search_notes` â€” searches locally stored notes using a text query.
- `search_faqs` â€” searches locally stored FAQ questions and answers.
- `get_note` â€” retrieves one complete note using its unique ID.

The P0 tools are registered and currently return placeholder JSON responses.

### P1 Tools

The following tools are optional planned features:

- `list_notes` â€” lists available notes with optional tag filtering.
- `add_note` â€” adds a new note to the local collection.

The P1 tools are registered but currently return a `Not implemented yet` response.

## Completed Work

- Selected Notes & FAQ Search as the project idea.
- Completed the project design document.
- Received mentor approval for the project design.
- Defined three P0 tools and two P1 tools.
- Added Zod input schemas for all planned tools.
- Added descriptions and validation rules for tool inputs.
- Added a local script for testing the three P0 schemas.
- Added one valid example input for every planned tool.
- Added the MCP server dependency.
- Added a `createServer()` factory.
- Added one register function per tool.
- Registered all five planned tools.
- Connected the MCP server using `serveStdio`.
- Added a development command for running the server.
- Confirmed that TypeScript and schema checks pass.
- Confirmed that the MCP server starts successfully over stdio.
- Verified all five planned tools using MCP Inspector.
- Selected local JSON files as the data source for all P0 tools.
- Added local fixture notes in `data/notes.json`.
- Added local FAQ entries in `data/faqs.json`.

## Planned Features

- Connect `search_notes` to the local notes fixture.
- Connect `search_faqs` to the local FAQ fixture.
- Connect `get_note` to the local notes fixture.
- Implement keyword-based note searching.
- Implement FAQ searching.
- Retrieve complete notes by ID.
- Add search normalization and relevance scoring.
- Add clear errors for missing notes.
- Validate local fixture data when the server starts.
- Replace placeholder handlers with real local data handlers.
- Test the completed P0 workflow in MCP Inspector.
- Add build and production start commands when required.

## Week 3 Data Sources

All three P0 tools use local JSON fixture files:

- `search_notes` will read from `data/notes.json`.
- `get_note` will read from `data/notes.json`.
- `search_faqs` will read from `data/faqs.json`.

The project does not use an external API, paid API key, cloud database, or hosted search service.

Because the primary data source is stored inside the repository, the Demo Day workflow can continue working when Wi-Fi is unavailable.

The current P0 handlers have not yet been connected to these files.

## Current Project Structure

```text
mcp-Notes-FAQ-Search-MCP-server/
â”œâ”€â”€ data/
â”‚   â”œâ”€â”€ faqs.json
â”‚   â””â”€â”€ notes.json
â”œâ”€â”€ docs/
â”‚   â”œâ”€â”€ design.md
â”‚   â””â”€â”€ project-choice.md
â”œâ”€â”€ examples/
â”‚   â”œâ”€â”€ add_note.json
â”‚   â”œâ”€â”€ get_note.json
â”‚   â”œâ”€â”€ list_notes.json
â”‚   â”œâ”€â”€ search_faqs.json
â”‚   â””â”€â”€ search_notes.json
â”œâ”€â”€ scripts/
â”‚   â””â”€â”€ check-schemas.ts
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ schemas/
â”‚   â”‚   â”œâ”€â”€ add-note.ts
â”‚   â”‚   â”œâ”€â”€ get-note.ts
â”‚   â”‚   â”œâ”€â”€ list-notes.ts
â”‚   â”‚   â”œâ”€â”€ search-faqs.ts
â”‚   â”‚   â””â”€â”€ search-notes.ts
â”‚   â”œâ”€â”€ tools/
â”‚   â”‚   â”œâ”€â”€ add-note.ts
â”‚   â”‚   â”œâ”€â”€ get-note.ts
â”‚   â”‚   â”œâ”€â”€ list-notes.ts
â”‚   â”‚   â”œâ”€â”€ search-faqs.ts
â”‚   â”‚   â””â”€â”€ search-notes.ts
â”‚   â””â”€â”€ index.ts
â”œâ”€â”€ .gitignore
â”œâ”€â”€ README.md
â”œâ”€â”€ package.json
â”œâ”€â”€ package-lock.json
â””â”€â”€ tsconfig.json
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

## Zod Schema Validation

Run the local P0 schema sanity checks:

```bash
npm run check:schemas
```

The script checks valid and invalid inputs for:

- `search_notes`
- `search_faqs`
- `get_note`

A successful run should end with:

```text
All P0 schema checks passed.
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

The files are valid JSON fixtures committed to the repository.

They are not yet connected to the P0 Tool handlers.

## Zod Schemas

Tool input schemas are located in:

```text
src/schemas/
```

The current schemas are:

- `search-notes.ts`
- `search-faqs.ts`
- `get-note.ts`
- `list-notes.ts`
- `add-note.ts`

## Week 2 Multi-tool Server Skeleton

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

## MCP Inspector Skeleton Demo

The registered tools can be tested using MCP Inspector.

Run the Inspector from the project root:

```bash
npx -y @modelcontextprotocol/inspector npx tsx src/index.ts
```

The Inspector should list the following tools:

- `search_notes`
- `search_faqs`
- `get_note`
- `list_notes`
- `add_note`

Valid sample arguments for every tool are available inside:

```text
examples/
```

During the Week 2 skeleton demo:

- All five planned tools were discoverable.
- The three P0 tools accepted valid sample inputs.
- Placeholder responses were returned successfully.
- A `search_notes` call without the required `query` field was rejected by schema validation.

This Inspector proof covers the Week 2 placeholder handlers only. Real local-data behavior has not yet been tested.

## Commands Not Added Yet

The following commands are not available yet:

```bash
npm run build
npm start
npm run inspect
```

They will be added only when the corresponding build, production start, and MCP Inspector setup is implemented.

## Offline Operation

The notes and FAQ fixture data is stored locally inside the repository.

The project does not require paid APIs, API keys, cloud storage, hosted AI models, or an internet connection to access the fixture files.

The current P0 Tool handlers still return placeholder responses and do not yet read the fixture data.

## Project Status

- [x] Project selected
- [x] Project design completed
- [x] Three P0 tools defined
- [x] Two P1 tools defined
- [x] P0 Zod schemas added
- [x] P1 Zod schemas added
- [x] Local P0 schema checks added
- [x] MCP server factory added
- [x] Stdio server setup added
- [x] All planned tools registered
- [x] Placeholder handlers added
- [x] Development server command added
- [x] One valid JSON example added for every planned tool
- [x] All planned tools discovered in MCP Inspector
- [x] Valid P0 calls verified in MCP Inspector
- [x] Invalid input rejection verified
- [x] Week 2 Inspector proof completed
- [x] Local notes data added
- [x] Local FAQ data added
- [ ] Local fixture validation added to the server
- [ ] Real P0 handlers implemented
- [ ] Missing-note error handling implemented
- [ ] Real local-data handlers tested in MCP Inspector

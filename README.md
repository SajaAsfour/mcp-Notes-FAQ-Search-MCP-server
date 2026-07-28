# NextFlows

Hi, this is my Academy MCP project

https://nextflows.ai/academy

## Project Overview

Notes & FAQ Search is an MCP server that allows users to search their own notes and frequently asked questions fully offline.

The project provides a simple and private way to find information without requiring paid API keys, cloud storage, or an internet connection while the server is running.

## Project Goal

The goal of this project is to help students and other users quickly search their personal notes and FAQ collections through focused MCP tools.

## Current Stage

Week 2 — Multi-tool MCP server skeleton completed.

The project now includes a working MCP server factory, stdio transport setup, and one register function for every planned tool.

The tools currently return placeholder responses. Local data and real search behavior will be implemented in Week 3.

## Tool Inventory

### P0 Tools

The following tools are required for the Demo Day workflow:

- `search_notes` — searches locally stored notes using a text query.
- `search_faqs` — searches locally stored FAQ questions and answers.
- `get_note` — retrieves one complete note using its unique ID.

The P0 tools are registered and currently return placeholder JSON responses.

### P1 Tools

The following tools are optional planned features:

- `list_notes` — lists available notes with optional tag filtering.
- `add_note` — adds a new note to the local collection.

The P1 tools are registered but currently return a `Not implemented yet` response.

## Completed Work

- Selected Notes & FAQ Search as the project idea.
- Completed the project design document.
- Received mentor approval for the project design.
- Defined three P0 tools and two P1 tools.
- Added Zod input schemas for all planned tools.
- Added descriptions and validation rules for tool inputs.
- Added a local script for testing the three P0 schemas.
- Added an example input for the `get_note` tool.
- Added the MCP server dependency.
- Added a `createServer()` factory.
- Added one register function per tool.
- Registered all five planned tools.
- Connected the MCP server using `serveStdio`.
- Added a development command for running the server.
- Confirmed that TypeScript and schema checks pass.
- Confirmed that the MCP server starts successfully over stdio.

## Planned Features

- Add local fixture data for notes.
- Add local fixture data for FAQ entries.
- Implement keyword-based note searching.
- Implement FAQ searching.
- Retrieve complete notes by ID.
- Add clear errors for missing notes.
- Replace placeholder handlers with real local data handlers.
- Test the completed P0 workflow in MCP Inspector.
- Add build and production start commands when required.

## Current Project Structure

```text
mcp-Notes-FAQ-Search-MCP-server/
├── docs/
│   ├── design.md
│   └── project-choice.md
├── examples/
│   └── get-note.json
├── scripts/
│   └── check-schemas.ts
├── src/
│   ├── schemas/
│   │   ├── add-note.ts
│   │   ├── get-note.ts
│   │   ├── list-notes.ts
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

## Commands Not Added Yet

The following commands are not available yet:

```bash
npm run build
npm start
npm run inspect
```

They will be added only when the corresponding build, production start, and MCP Inspector setup is implemented.

## Offline Operation

The final project will store and search notes and FAQ data locally.

It will not require paid APIs, cloud storage, hosted AI models, or an internet connection while running.

The current stub handlers do not access external services.

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
- [ ] Local notes data added
- [ ] Local FAQ data added
- [ ] Real P0 handlers implemented
- [ ] Error handling implemented
- [ ] MCP Inspector testing completed
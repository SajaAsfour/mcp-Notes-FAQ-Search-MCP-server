# NextFlows

Hi, this is my Academy MCP project

https://nextflows.ai/academy

## Project Overview

Notes & FAQ Search is an MCP server that allows users to search their own notes and frequently asked questions fully offline.

The project is designed to provide a simple, private, and accessible way to find information without requiring paid API keys or an internet connection.

## Project Goal

The goal of this project is to help students and other users quickly search their personal notes and FAQ collections through MCP tools.

## Current Stage

Week 2 — Project design and Zod schemas completed.

The project design was reviewed and approved by the mentor. Input schemas have been added for the three P0 tools, along with a local schema validation script.

## P0 Tools

The following tools are required for the Demo Day version of the project:

- `search_notes` — searches the locally stored notes using a text query.
- `search_faqs` — searches the locally stored FAQ entries.
- `get_note` — retrieves one complete note using its unique ID.

The tool handlers will be implemented in a later stage. The current stage defines and validates the input contract for each tool.

## Completed Work

- Selected Notes & FAQ Search as the project idea.
- Completed the project design document.
- Added Zod schemas for the three P0 tools.
- Added descriptions and validation rules for every input field.
- Added sensible minimum and maximum input limits.
- Added a local script for testing valid and invalid schema inputs.
- Added an example input for the `get_note` tool.
- Confirmed that the TypeScript and schema checks pass.

## Planned Features

- Search notes using keywords.
- Search frequently asked questions.
- Retrieve the full content of a specific note.
- List available notes.
- Add new notes.
- Return clear and structured search results.
- Work fully offline.

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
│   │   ├── search-notes.ts
│   │   ├── search-faqs.ts
│   │   └── get-note.ts
│   └── index.ts
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Prerequisites

Before running the project checks, make sure the following are installed:

- Node.js
- npm

You can check the installed versions using:

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

This command checks the TypeScript files without generating build output.

## Zod Schema Validation

Run the local schema sanity checks:

```bash
npm run check:schemas
```

The validation script tests the three P0 schemas using valid and invalid inputs.

A successful run should end with:

```text
All P0 schema checks passed.
```

## Zod Schemas

The current input schemas are located in:

```text
src/schemas/
```

### `search_notes`

File:

```text
src/schemas/search-notes.ts
```

Validates:

- A required search query.
- Query length limits.
- An optional result limit.
- A positive integer result limit with a maximum value.

### `search_faqs`

File:

```text
src/schemas/search-faqs.ts
```

Validates:

- A required FAQ search query.
- Query length limits.
- An optional result limit.
- A positive integer result limit with a maximum value.

### `get_note`

File:

```text
src/schemas/get-note.ts
```

Validates:

- A required note ID.
- Empty note IDs.
- The maximum note ID length.

## Running the MCP Server

The MCP tool handlers and server registration are still under development.

The build, server start, and MCP Inspector commands will be added after the tools are implemented and registered in the server.

The planned commands are:

```bash
npm run build
npm start
npm run inspect
```

These commands should not be used until their scripts are added to `package.json`.

## Offline Operation

The final project will store and search its notes and FAQ data locally. It will not require paid APIs, cloud storage, or an internet connection while running.

## Project Status

- [x] Project selected
- [x] Project design completed
- [x] Three P0 tools defined
- [x] Zod schemas added for all P0 tools
- [x] Local schema checks added
- [ ] Local notes and FAQ data added
- [ ] Tool handlers implemented
- [ ] Tools registered in the MCP server
- [ ] MCP Inspector testing completed
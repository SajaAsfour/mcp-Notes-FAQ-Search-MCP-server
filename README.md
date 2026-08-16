# NextFlows

Hi, this is my Academy MCP project

https://nextflows.ai/academy

# Notes & FAQ Search MCP Server

## What It Does

Notes & FAQ Search is a TypeScript MCP server for searching and managing locally stored notes and frequently asked questions.

The server works fully offline at runtime and uses local JSON fixture data instead of a cloud database or external API.

It exposes five MCP tools:

* Search notes.
* Search FAQs.
* Retrieve a complete note by ID.
* List notes with optional tag filtering.
* Add a new note safely to local storage.

The server also exposes two read-only MCP resources:

* `notes://index`
* `faq://index`

## Requirements

Before installing the project, make sure you have:

* Git
* Node.js 20 or later
* npm

Check Node.js and npm with:

```bash
node --version
npm --version
```

## Install

Clone the repository:

```bash
git clone https://github.com/SajaAsfour/mcp-Notes-FAQ-Search-MCP-server.git
```

Enter the project directory:

```bash
cd mcp-Notes-FAQ-Search-MCP-server
```

Install the dependencies:

```bash
npm install
```

## Run

Start the MCP server in development mode:

```bash
npm run dev
```

The server runs over stdio and waits for an MCP client connection.

To stop it, press:

```text
Ctrl+C
```

Optional smoke tests can be run with:

```bash
npm test
```

## MCP Inspector

From the project root, launch MCP Inspector with:

```bash
npx -y @modelcontextprotocol/inspector npx tsx src/index.ts
```

When the Inspector opens, connect to the server and open the **Tools** section.

You should see all five tools listed below.

## Tools

| Tool           | Purpose                                          | Main Input                          |
| -------------- | ------------------------------------------------ | ----------------------------------- |
| `search_notes` | Search locally stored notes using keywords       | `query`, optional `limit`           |
| `search_faqs`  | Search locally stored FAQ questions and answers  | `query`, optional `limit`           |
| `get_note`     | Retrieve one complete note by its ID             | `note_id`                           |
| `list_notes`   | List stored notes, optionally filtered by tag    | optional `tag`, optional `limit`    |
| `add_note`     | Validate and add a new note to `data/notes.json` | `title`, `content`, optional `tags` |

`limit` must be a positive integer no greater than `20`.

## Example Prompts

### Search notes

Ask the server to:

> Find notes about MCP tools and resources.

Use `search_notes` with:

```json
{
  "query": "MCP tools and resources",
  "limit": 5
}
```

### Search FAQs

Ask the server to:

> Find the FAQ that explains what an MCP tool is.

Use `search_faqs` with:

```json
{
  "query": "What is an MCP tool?",
  "limit": 5
}
```

### Get a note

Ask the server to:

> Get the full note with ID note-001.

Use `get_note` with:

```json
{
  "note_id": "note-001"
}
```

### List notes

Ask the server to:

> List up to five notes.

Use `list_notes` with:

```json
{
  "limit": 5
}
```

### Add a note

Ask the server to:

> Add a note about testing the MCP server.

Use `add_note` with:

```json
{
  "title": "MCP Testing",
  "content": "Use MCP Inspector to test the server tools.",
  "tags": ["mcp", "testing"]
}
```

`add_note` writes the validated note to `data/notes.json`, so it changes the local fixture data.

## Troubleshooting

### 1. `npm` or Node.js is not available

If commands such as `npm install` or `npm run dev` are not recognized, confirm that Node.js 20 or later and npm are installed:

```bash
node --version
npm --version
```

Install or update Node.js if the commands are missing or the Node.js version is older than 20.

### 2. The server or MCP Inspector does not start

Make sure you are running commands from the repository root and that dependencies were installed first:

```bash
npm install
```

Then launch Inspector with the exact command:

```bash
npx -y @modelcontextprotocol/inspector npx tsx src/index.ts
```

The project uses stdio for MCP communication, so avoid adding normal output to stdout while the MCP server is running.

### 3. A tool returns an input validation error

Check that the input matches the expected schema.

For search tools:

* `query` must not be empty.
* `limit`, when provided, must be a positive integer from `1` to `20`.

For `get_note`, use an ID in this format:

```text
note-001
```

For example:

```json
{
  "note_id": "note-001"
}
```

Do not use file paths or values such as `../etc/passwd` as note IDs.

## License

This project is licensed under the ISC license as declared in `package.json`.

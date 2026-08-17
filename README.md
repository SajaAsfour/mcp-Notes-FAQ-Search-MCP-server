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

> **Note:** If you are using MCP Inspector for testing, you do **not** need to run `npm run dev` separately. The MCP Inspector command below starts the server for the Inspector connection.

Optional smoke tests can be run with:

```bash
npm test
```

## MCP Inspector

From the project root, launch MCP Inspector with:

```bash
npx -y @modelcontextprotocol/inspector npx tsx src/index.ts
```

> **Important:** Use either `npm run dev` with another MCP client, or the MCP Inspector command for Inspector-based testing. You do not need to run both at the same time.

When the Inspector opens, connect to the server and open the **Tools** section.

You should see all five tools listed below.

### First Successful Tool Call

To verify that the server is working, you can make your first tool call using `get_note`:

1. Open the **Tools** section in MCP Inspector.
2. Select `get_note`.
3. Enter the following input:

```json
{
  "note_id": "note-001"
}
```

4. Run the tool.

A successful call should return the requested note data in the Inspector response.

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

`add_note` writes the validated note to `data/notes.json`. This changes **only the local copy of the project's fixture data on your machine**; it does not modify any shared database or GitHub data.

## Example Conversations

See [examples/conversations.md](examples/conversations.md) for complete model interaction examples covering all five MCP tools, including the user prompt, expected tool call arguments, and example final responses.

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

If you are using MCP Inspector, do not start `npm run dev` at the same time.

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

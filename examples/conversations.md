# Example Conversations

These examples show how a user can interact with the Notes & FAQ Search MCP Server through a model. Each conversation starts with a natural-language request, shows the expected MCP tool call, and gives an example of the final answer the user should receive.

## Conversation A — Search Notes

**User prompt**

> Find my notes about MCP tools and resources.

**Expected tool call**

1. `search_notes`

```json
{
  "query": "MCP tools and resources",
  "limit": 5
}
```

**Good final answer**

I found notes related to MCP tools and resources. The most relevant results include notes covering MCP tools, resources, and how they are used in the project.

---

## Conversation B — Get a Complete Note

**User prompt**

> Show me the full note with ID note-001.

**Expected tool call**

1. `get_note`

```json
{
  "note_id": "note-001"
}
```

**Good final answer**

Here is the complete note for `note-001`, including its title, full content, tags, and other stored note information.

---

## Conversation C — List Notes

**User prompt**

> List up to five of my saved notes.

**Expected tool call**

1. `list_notes`

```json
{
  "limit": 5
}
```

**Good final answer**

Here are up to five saved notes from your local collection, with their basic note information so you can decide which one you want to open.

---

## Conversation D — Search FAQs

**User prompt**

> Find the FAQ that explains what an MCP tool is.

**Expected tool call**

1. `search_faqs`

```json
{
  "query": "What is an MCP tool?",
  "limit": 5
}
```

**Good final answer**

I found the FAQ explaining what an MCP tool is. It describes an MCP tool as a capability exposed by the server that a model can call to perform a specific action.

---

## Conversation E — Add a Note

**User prompt**

> Save a note reminding me how to test the MCP server.

**Expected tool call**

1. `add_note`

```json
{
  "title": "MCP Testing",
  "content": "Use MCP Inspector to test the server tools.",
  "tags": [
    "mcp",
    "testing"
  ]
}
```

**Good final answer**

I added a new note titled **MCP Testing** to your local notes collection with the tags `mcp` and `testing`.

---

## Conversation F — Update a Note

**User prompt**

> Update note-001 and change its title to Updated MCP Note.

**Expected tool call**

1. `update_note`

```json
{
  "note_id": "note-001",
  "title": "Updated MCP Note"
}
```

**Good final answer**

The note was updated successfully. Its ID remains `note-001`, and the requested title change was saved to the local notes collection.

---

## Conversation G — Delete a Note

User prompt

> Delete the note with ID note-006.

Expected tool call

1. `delete_note`

```json
{
  "note_id": "note-006"
}
```

**Good final answer**

The note was deleted successfully from the local note collection. A follow-up list_notes call can be used to confirm that the note is no longer present.

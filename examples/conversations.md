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

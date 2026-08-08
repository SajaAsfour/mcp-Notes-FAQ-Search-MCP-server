# Threat Model — Notes & FAQ Search MCP

## Assets

The main assets are the local `data/notes.json` and `data/faqs.json` files, the integrity and availability of the stored notes and FAQ data, the machine filesystem outside the project `data/` directory, and the MCP context returned to the client. The server is designed to run fully offline and currently does not require API keys, access tokens, passwords, or other external-service secrets.

## Trust boundaries

The first trust boundary is **model → tool arguments**. Inputs such as `query`, `note_id`, `tag`, `limit`, `title`, `content`, and `tags` are model-controlled and must be treated as untrusted input.

The second boundary is **tool/resource → filesystem**. The tools and resources read `data/notes.json` or `data/faqs.json`, while `add_note` also writes to `data/notes.json`. File access must remain inside the project data directory.

A third possible boundary is **tool → network**. The exposed MCP tools are currently offline and do not perform network requests. The project contains a generic HTTP helper, so it must never receive a model-controlled destination without additional validation.

Stored fixture data is also treated as untrusted when it crosses **filesystem → MCP response**, because malformed or extremely large stored content could affect the server or the model context.

## Top 5 risks

1. **Local file access escaping the data directory.** If a future tool allowed the model to control a filename or path, traversal input such as `../` could attempt to read or overwrite files outside `data/`. Current note and FAQ operations use fixed fixture names, and the shared data path resolver rejects absolute paths and `..`, so this boundary must be preserved.

2. **Runaway MCP responses.** `get_note` returns complete note content, while `notes://index` and `notes://faq` can return collections. A very large stored note or fixture could create an oversized MCP response and consume unnecessary model context. Search results are safer because their result count is bounded, and note search uses excerpts.

3. **Untrusted content growing the notes store.** `add_note` accepts model-controlled text and persists it to `data/notes.json`. A single input is already bounded by Zod, but repeated valid requests could still grow the fixture and increase future read, search, and response sizes.
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

4. **Concurrent or failed note writes affecting data integrity.** `add_note` performs a read-modify-write operation on the shared notes fixture. Safe temporary-file replacement protects an individual write, but overlapping write operations could still work from stale copies of the collection and cause lost updates. Write failures must also leave the original fixture usable.

5. **Unsafe future network destinations and information leakage.** The current exposed tools do not use the network, but `src/lib/http.ts` accepts a URL and performs `fetch`. If a future MCP argument were passed directly to that helper, the model could attempt requests to localhost, private addresses, or unexpected hosts. Full URLs, sensitive user content, filesystem details, or raw stack traces must also not be exposed through responses or logs.

## Mitigations this week

- **Filesystem boundary:** keep note and FAQ filenames server-controlled, continue resolving all reads and writes through the shared safe data-path resolver, and add negative tests for absolute paths and `..` traversal.
- **Input validation:** keep Zod validation on every tool argument. Queries remain limited to 200 characters, search/list limits remain capped at 20, and `add_note` keeps explicit limits for title, content, and tags.
- **Response size:** add or verify explicit size limits for full-note and collection-style responses so a large fixture cannot flood the MCP context. Search tools should continue returning focused results rather than complete fixture dumps.
- **Write integrity:** continue validating the complete notes collection before persistence and using temporary-file replacement. Add failure and repeated-write tests, and serialize note writes if concurrent writes can overwrite each other.
- **Network and secret safety:** keep user-controlled URLs disconnected from the HTTP helper. If network access becomes necessary, allowlist the protocol and destination host, reject localhost/private destinations, keep a short timeout, and avoid logging secrets or complete sensitive URLs. User-facing responses must remain short and sanitized.

## Out of scope

This student project does not include authentication, multiple users, roles, remote databases, cloud storage, external APIs, or production deployment. Therefore, account authorization, tenant isolation, cloud credential management, and production network perimeter controls are intentionally out of scope. The server uses small local fixtures and is designed for a controlled local demo environment, but the boundaries above are still hardened because MCP arguments are untrusted. Advanced defenses such as a full sandbox, operating-system isolation, distributed locking, and enterprise monitoring are also outside the scope of this Academy project.
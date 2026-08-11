# Security Policy

## Supported Versions

This student MCP project supports only the current code maintained in this repository.

There are no separate published releases or older maintained versions.

| Version | Supported |
| --- | --- |
| Current repository code | Yes |
| Older snapshots, forks, or copied versions | No |

## Reporting a Security Issue

If you find a security issue in this project, report it privately to the project mentor:

**Email:** <info@nextflows.ai>

Please include a short description of the issue, the affected tool or resource, and simple reproduction steps when possible.

Do not include real API keys, tokens, passwords, private keys, or other secrets in the report.

## Week 4 Hardening Summary

This repository treats all model-controlled MCP tool arguments as untrusted input.

### Validation and filesystem safety

Tool inputs are validated with strict Zod schemas, including non-empty string checks, maximum lengths, bounded result limits, and note ID format validation.

Local note and FAQ file access remains restricted to the project `data/` directory, and traversal-style paths such as `../` are rejected by the shared safe data-path handling.

### Network allowlisting and timeouts

The current MCP tools operate fully offline.

The shared HTTP helper is hardened for possible future use. It allows HTTPS only, uses an exact host allowlist that currently denies all hosts by default, rejects redirects, uses an 8000 ms default timeout, and does not allow a timeout above 10000 ms.

### Output limits

Large MCP responses are capped to reduce unnecessary model context usage.

- Full note content returned by `get_note` is capped at 4000 characters.
- FAQ answers returned to MCP clients are capped at 1000 characters.
- Collection-style MCP resources return at most 20 items.
- Truncated responses include metadata indicating that truncation occurred.

### Write safety

`add_note` validates title, content, and tags before persistence.

Local note writes use safe temporary-file replacement and in-process serialization to reduce the risk of damaged or lost updates.

### Secret handling

Local environment files, common private-key files, and credential files are excluded through `.gitignore`.

The tracked `.env.example` contains placeholder names only and no real credentials.

### Error handling

Tool failures return short, sanitized, actionable messages to the MCP client.

Internal exceptions and raw stack traces are not returned to the model.
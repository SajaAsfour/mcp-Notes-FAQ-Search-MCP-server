# Week 5 Manual Test Plan

## Purpose

This test plan verifies that the Notes & FAQ Search MCP Server works correctly through MCP Inspector using the real local fixture data and the hardened validation rules completed in previous weeks.

All tests are executed against the Week 5 branch without adding new product features.

## Test Environment

- Runtime: Node.js
- MCP transport: stdio
- Test client: MCP Inspector
- Data source: local JSON fixtures
- External API dependency: none

## Test Cases

| ID | Tool | Setup | Input | Expected | Result | Evidence |
|---|---|---|---|---|---|---|
| W5-01 | `search_notes` | Server running with the committed `data/notes.json` fixture | `{"query":"MCP","limit":5}` | Request succeeds and returns matching MCP-related notes from the local fixture. | PASS | `docs/evidence/w5-01-search-notes-happy.png` |
| W5-02 | `search_notes` | Server running with the committed `data/notes.json` fixture | `{"query":"pineapple orbit xyz","limit":5}` | Request succeeds with an empty `results` array and a no-matches message. | PENDING | Pending Inspector run |
| W5-03 | `get_note` | Server running with the committed `data/notes.json` fixture | `{"note_id":"note-001"}` | Request succeeds and returns note `note-001`, titled `MCP Tools and Resources`. | PENDING | Pending Inspector run |
| W5-04 | `get_note` | Server running normally | `{"note_id":"../etc/passwd"}` | MCP input validation rejects the request because the note ID does not match the allowed `note-###` format. No filesystem data is exposed. | Pass | `docs/evidence/w5-04-get-note-invalid-id.png` |

## Evidence

Evidence screenshots are stored under:

`docs/evidence/`

Required evidence for the completed plan includes:

- one successful happy-path tool call
- one rejected invalid-input call
- one empty-result or error-path call
- one successful offline tool call

## Result Rules

Use:

- `PASS` only after the actual Inspector result matches the expected result.
- `FAIL` when the actual result differs from the expected result.
- `PENDING` before the case has been executed.

If a case fails, record the fixing commit and re-run the same case before changing it to `PASS`.
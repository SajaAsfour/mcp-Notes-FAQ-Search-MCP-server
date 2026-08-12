# Week 4 On-Site Peer Review Checklist

## Review Details

- Project: Notes & FAQ Search MCP Server
- Review branch: `week-4-harden`
- Peer reviewer: Rawand Bawatneh
- Review stage: Week 4 — Security Hardening

## Review Areas

### Input Validation and Zod Schemas

Reviewed.

The peer review identified one high-priority issue in the `search_faqs` tool registration. The tool was registering `searchFaqsInputSchema.shape` instead of the complete Zod schema.

Action taken:

`search_faqs` was updated to register the complete schema:

`inputSchema: searchFaqsInputSchema`

Owner: Yara Khattab  
Due: End of Week 4  
Fix implemented; peer confirmation pending.

### Error Handling

Reviewed.

No specific error-handling issue was reported in the written peer feedback. The reviewer noted that the overall project structure and security hardening were in good shape.

Status: No action item reported.

### Secrets and Environment Files

Reviewed.

No specific secrets or `.env` issue was reported in the written peer feedback.

Status: No action item reported.

### Filesystem and Data Allowlists

Reviewed.

No specific filesystem allowlist or Path Traversal issue was reported in the written peer feedback.

Status: No action item reported.

### README and Resource Documentation

The peer review identified a low-priority documentation mismatch.

The README documented the FAQ resource as:

`notes://faq`

while the actual registered resource URI is:

`faq://index`

Action taken:

The README was updated so the documented FAQ resource URI matches the implementation.

Owner: Saja Asfour  
Due: End of Week 4  
Fix implemented; peer confirmation pending.

### Demo Path

The Week 4 peer-review demo path covers the three P0 tools:

- `search_notes`
- `search_faqs`
- `get_note`

The security demonstration also includes a rejected Path Traversal-style input such as:

`../etc/passwd`

for `get_note`.

## Peer Feedback Summary

### What Worked Well

The reviewer reported that the project is well structured and that the Week 4 security hardening is in good shape overall.

### Issues Found

1. High priority: `search_faqs` used `.shape` when registering its input schema instead of the complete Zod schema.
2. Low priority: the FAQ resource URI in the README did not match the implementation.

### Recommended Fixes

1. Register the complete `searchFaqsInputSchema` for `search_faqs`.
2. Update the README to document `faq://index`.

## Future Work

The reviewer suggested Arabic language understanding as a possible future enhancement so users could search notes and FAQs naturally using Arabic queries.

This is recorded as future work and is not a Week 4 must-fix item.

## Follow-Up

Both peer-review findings have been addressed in the project.
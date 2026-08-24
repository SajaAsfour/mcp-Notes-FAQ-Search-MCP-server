# Final Reflection

## Saja Asfour — Partner 1

### Wins

Over the six-week project, I helped turn the Notes & FAQ Search MCP Server from an initial project idea into a complete public MCP project that can be installed, tested, and demonstrated in a real host.

My main contributions included the Notes-side functionality, `search_notes`, `list_notes`, Notes resource support, output and security hardening, safe error handling, path-traversal regression work, smoke testing, repository documentation, and final shipping work. I also helped connect the MCP server to Claude Desktop on Windows and prepared the real-host demo flow used for the final presentation.

By the end of the cohort, the project had five exposed MCP tools:

* `search_notes`
* `search_faqs`
* `get_note`
* `list_notes`
* `add_note`

It also had two MCP resources:

* `notes://index`
* `faq://index`

The final project was published as a public repository, released as `v1.0.0`, verified in MCP Inspector, connected successfully to Claude Desktop, and prepared for a live Demo Day presentation.

### Blockers and What Was Genuinely Hard

The hardest part for me was getting the MCP server to run reliably inside a real MCP host instead of only proving that it worked in development tools.

Claude Desktop on Windows required extra troubleshooting because the server needed to start correctly through stdio without breaking the MCP communication channel. I had to verify the configuration, troubleshoot startup behavior, and eventually use a Windows launcher script so that Claude Desktop could start the TypeScript server consistently.

Another challenge was making sure that changes made for security and reliability did not break the existing MCP behavior. Small implementation details such as safe errors, bounded outputs, filesystem handling, and stdout versus stderr mattered because an MCP server can fail even when the underlying business logic appears correct.

The final result was more valuable because these blockers forced me to test the project as something a real user could run, not only as source code that worked on my machine.

### Resume Blurb

Built and shipped an offline Notes & FAQ Search MCP Server using TypeScript, the Model Context Protocol, Zod v4, and local JSON storage. Implemented and hardened Notes-side search, retrieval, listing, resource access, validation, safe errors, and bounded outputs while contributing to testing and public project documentation. Integrated the MCP server with Claude Desktop on Windows and verified its behavior through MCP Inspector and a real MCP host. Delivered the project as a public `v1.0.0` release with five working MCP tools, two resources, offline runtime support, and a live Demo Day workflow.

### Resume Bullet

* Built and shipped a public offline MCP server with TypeScript, Zod v4, and local JSON storage, implementing and hardening Notes-side search and retrieval workflows and integrating the final five-tool server with Claude Desktop and MCP Inspector for a live `v1.0.0` release.

### LinkedIn Draft

Over the past six weeks at NextFlows Academy, I worked with my teammate on building and shipping a complete Notes & FAQ Search MCP Server. We used TypeScript, the Model Context Protocol, Zod v4, and local JSON data to create five MCP tools and two resources for searching, retrieving, listing, and safely adding local knowledge. One of the most valuable parts of the project for me was moving beyond local implementation and getting the server connected to Claude Desktop as a real MCP host, while also working through validation, security, testing, documentation, and release preparation. We finished the cohort with a public `v1.0.0` repository, an offline-capable MCP runtime, and a project that we can demonstrate and continue building after the academy.

### One Improvement I Would Make Next

If I continued the project for two more weeks, I would improve the local search quality and ranking.

The current search flow is intentionally simple and predictable, which was appropriate for the scope of the cohort. As a next step, I would experiment with better local ranking and matching while keeping the server offline and preserving the same bounded-output and validation controls. The goal would be to return more relevant results for natural-language queries without adding a cloud dependency or changing the project's lightweight architecture.


---

## Yara Khattab — Partner 2

### Wins

During the six-week project, I contributed to building the FAQ and safe-write side of the Notes & FAQ Search MCP Server and helped bring the project from implementation to a complete public release.

My work included `search_faqs`, the historical `get_note` schema, FAQ-side functionality, `add_note`, stored-data validation, safe write handling, network and helper review, secret and environment auditing, smoke testing, README documentation, example conversations, and final Demo Day coverage.

I also contributed fixes found during review, including the Week 4 `search_faqs` registration correction, and helped complete the final five-tool documentation and demo flow.

By the end of the project, our server exposed five working MCP tools and two resources, used validated local JSON data, supported safe local note writes, and was prepared as a public `v1.0.0` project for real-host demonstration.

### Blockers and What Was Genuinely Hard

One of the most difficult parts of the project was making write functionality safe while keeping the implementation simple.

`add_note` could not be treated like a normal in-memory example because it modifies the real local `data/notes.json` file. That meant the input needed to be validated carefully, the write needed to stay inside the expected data location, and the file had to remain valid and usable after the operation.

Another challenge was finding and correcting small integration issues that were easy to miss when looking only at individual files. For example, review work around tool registration and schemas showed that a tool can look correct internally but still be exposed incorrectly to the MCP client.

These problems taught me to test the complete path from schema and handler to registration and user-facing behavior rather than assuming that isolated pieces automatically work together.

### Resume Blurb

Built and shipped an offline Notes & FAQ Search MCP Server using TypeScript, the Model Context Protocol, Zod v4, and local JSON storage. Implemented FAQ search and safe note-writing workflows, including validation, controlled filesystem writes, stored-data checks, and tool integration. Contributed to testing, documentation, security review, example conversations, and final five-tool Demo Day coverage. Delivered the work as part of a public `v1.0.0` MCP project with five working tools, two resources, and real Claude Desktop integration.

### Resume Bullet

* Built FAQ search and validated local write workflows for a public TypeScript MCP server using Zod v4 and local JSON storage, contributing security review, testing, documentation, and complete five-tool Demo Day delivery for the `v1.0.0` release.

### LinkedIn Draft

Over the past six weeks at NextFlows Academy, I worked with my teammate on building a complete Notes & FAQ Search MCP Server using TypeScript, MCP, Zod v4, and local JSON storage. My work focused on the FAQ and safe-write side of the project, including search functionality, validation, `add_note`, stored-data safety, testing, review fixes, and final documentation. Throughout the project, I learned how important it is to test not only individual functions but the full MCP flow from schema and tool registration to the behavior seen by a real client. We completed the cohort with five working MCP tools, two resources, a public `v1.0.0` release, offline runtime support, and real Claude Desktop integration.

### One Improvement I Would Make Next

If I continued the project for another two weeks, I would improve the reliability of local data updates.

I would add stronger local persistence safeguards around note-writing operations, such as a more explicit atomic write strategy and additional regression tests for file-update failure cases. This would preserve the project's offline and lightweight design while making write operations even more resilient.


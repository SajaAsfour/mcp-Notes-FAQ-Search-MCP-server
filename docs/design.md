# Notes & FAQ Search — Project Design

## 1. Pitch

Notes & FAQ Search is a fully offline MCP server that helps users search through their personal notes and frequently asked questions. It is designed mainly for students and learners who need to find information quickly without manually opening and reviewing multiple files. The server exposes focused MCP tools for searching, listing, and retrieving notes and FAQ entries. All project data is stored and processed locally, so the project does not require internet access or paid API keys.

## 2. User and Demo Story

During Demo Day, a student asks, “What did I write about MCP tools and resources?” The MCP client first calls `search_notes` using the important words from the question. The search result returns matching notes with their IDs, titles, short excerpts, and relevance information. The client then calls `get_note` for the best matching result and gives the student a clear answer based only on their locally stored notes. The student can also ask a common course question, which causes `search_faqs` to return the most relevant FAQ answer.

## 4. Out of Scope

The following features will not be included in the initial project scope:

- User authentication, accounts, roles, or permissions.
- Paid APIs, hosted AI models, or services that require API keys.
- A mobile application or a complete graphical web interface.
- Cloud synchronization or online note storage.
- Automatic extraction of notes from images, audio, or scanned PDF files.
- Advanced semantic search using external embedding services or vector databases.

## 6. Risks and Mitigations

### Risk 1: Search results may be inaccurate

Simple keyword matching may return unrelated notes or fail to match words with different capitalization or punctuation.

**Mitigation:** Normalize both the stored data and the user query by converting text to lowercase, removing unnecessary punctuation, and using simple relevance scoring based on the number of matching terms.

### Risk 2: Local data may have inconsistent structure

Notes or FAQ entries may be missing required fields, contain duplicate IDs, or use an invalid format.

**Mitigation:** Define a clear local JSON data shape, validate the data when the server starts, provide fixture files for testing, and return readable errors instead of allowing the server to crash.

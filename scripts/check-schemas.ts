import { getNoteInputSchema } from "../src/schemas/get-note.js";
import { searchFaqsInputSchema } from "../src/schemas/search-faqs.js";
import { searchNotesInputSchema } from "../src/schemas/search-notes.js";

const validSearchNotes = searchNotesInputSchema.parse({
  query: "MCP tools",
  limit: 5,
});

const validSearchFaqs = searchFaqsInputSchema.parse({
  query: "How do I run the MCP server?",
  limit: 3,
});

const validGetNote = getNoteInputSchema.parse({
  note_id: "note-001",
});

const emptyNoteId = getNoteInputSchema.safeParse({
  note_id: "",
});

const emptySearchQuery = searchNotesInputSchema.safeParse({
  query: "",
});

const invalidFaqLimit = searchFaqsInputSchema.safeParse({
  query: "MCP",
  limit: 21,
});

if (emptyNoteId.success) {
  throw new Error("The get_note schema accepted an empty note ID.");
}

if (emptySearchQuery.success) {
  throw new Error("The search_notes schema accepted an empty query.");
}

if (invalidFaqLimit.success) {
  throw new Error("The search_faqs schema accepted a limit greater than 20.");
}

console.log("search_notes valid:", validSearchNotes);
console.log("search_faqs valid:", validSearchFaqs);
console.log("get_note valid:", validGetNote);
console.log("All P0 schema checks passed.");
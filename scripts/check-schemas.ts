import { readDataFile } from "../src/lib/read-data-file.js";
import { faqDataSchema, faqsDataSchema } from "../src/schemas/faq-data.js";
import { getNoteInputSchema } from "../src/schemas/get-note.js";
import {
  noteDataSchema,
  notesDataSchema,
} from "../src/schemas/note-data.js";
import { searchFaqsInputSchema } from "../src/schemas/search-faqs.js";
import { searchNotesInputSchema } from "../src/schemas/search-notes.js";
import { listNotesInputSchema } from "../src/schemas/list-notes.js";

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

const validListNotes = listNotesInputSchema.parse({
  tag: "mcp",
  limit: 5,
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

const emptyListTag = listNotesInputSchema.safeParse({
  tag: "",
  limit: 5,
});

const invalidListLimit = listNotesInputSchema.safeParse({
  tag: "mcp",
  limit: 21,
});

if (emptyNoteId.success) {
  throw new Error(
    "The get_note schema accepted an empty note ID.",
  );
}

if (emptySearchQuery.success) {
  throw new Error(
    "The search_notes schema accepted an empty query.",
  );
}

if (invalidFaqLimit.success) {
  throw new Error(
    "The search_faqs schema accepted a limit greater than 20.",
  );
}

if (emptyListTag.success) {
  throw new Error(
    "The list_notes schema accepted an empty tag.",
  );
}

if (invalidListLimit.success) {
  throw new Error(
    "The list_notes schema accepted a limit greater than 20.",
  );
}

const validNotesData = await readDataFile(
  "notes.json",
  notesDataSchema,
);

const validFaqsData = await readDataFile(
  "faqs.json",
  faqsDataSchema,
);

const invalidNoteShape = noteDataSchema.safeParse({
  id: "note-invalid",
  title: "Invalid note",
});

const invalidFaqShape = faqDataSchema.safeParse({
  id: "faq-invalid",
  question: "",
  answer: "Example answer",
});

const duplicateNotes = notesDataSchema.safeParse([
  {
    id: "note-duplicate",
    title: "First duplicate",
    content: "First duplicate note.",
    tags: ["test"],
    created_at: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "note-duplicate",
    title: "Second duplicate",
    content: "Second duplicate note.",
    tags: ["test"],
    created_at: "2026-08-02T00:00:00.000Z",
  },
]);

const duplicateFaqs = faqsDataSchema.safeParse([
  {
    id: "faq-duplicate",
    question: "First question?",
    answer: "First answer.",
  },
  {
    id: "faq-duplicate",
    question: "Second question?",
    answer: "Second answer.",
  },
]);

if (invalidNoteShape.success) {
  throw new Error(
    "The note data schema accepted a note with missing fields.",
  );
}

if (invalidFaqShape.success) {
  throw new Error(
    "The FAQ data schema accepted an empty question.",
  );
}

if (duplicateNotes.success) {
  throw new Error(
    "The notes data schema accepted duplicate note IDs.",
  );
}

if (duplicateFaqs.success) {
  throw new Error(
    "The FAQ data schema accepted duplicate FAQ IDs.",
  );
}

let unsafePathWasRejected = false;

try {
  await readDataFile("../package.json", notesDataSchema);
} catch {
  unsafePathWasRejected = true;
}

if (!unsafePathWasRejected) {
  throw new Error(
    "The data file reader accepted a path outside the data directory.",
  );
}

console.log("search_notes valid:", validSearchNotes);
console.log("search_faqs valid:", validSearchFaqs);
console.log("get_note valid:", validGetNote);
console.log("notes data valid:", validNotesData.length);
console.log("FAQ data valid:", validFaqsData.length);
console.log("list_notes valid:", validListNotes);
console.log("Unsafe data path rejected.");
console.log(
  "All P0 and list_notes input and file schema checks passed.",
);
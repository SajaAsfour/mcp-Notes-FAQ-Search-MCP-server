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
import { writeDataFile } from "../src/lib/write-data-file.js";
import { addNoteInputSchema } from "../src/schemas/add-note.js";
import {
  capItems,
  MAX_NOTE_RESPONSE_CONTENT_CHARS,
  MAX_RESOURCE_ITEMS,
  truncateText,
} from "../src/lib/output.js";

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

const validAddNote = addNoteInputSchema.parse({
  title: "MCP Inspector Notes",
  content:
    "The MCP Inspector is used to test registered MCP tools.",
  tags: ["mcp", "inspector"],
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

const emptyAddNoteTitle = addNoteInputSchema.safeParse({
  title: "",
  content: "Valid content",
});

const emptyAddNoteContent = addNoteInputSchema.safeParse({
  title: "Valid title",
  content: "",
});

const tooManyAddNoteTags = addNoteInputSchema.safeParse({
  title: "Valid title",
  content: "Valid content",
  tags: Array.from(
    { length: 21 },
    (_, index) => `tag-${index + 1}`,
  ),
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

if (emptyAddNoteTitle.success) {
  throw new Error(
    "The add_note schema accepted an empty title.",
  );
}

if (emptyAddNoteContent.success) {
  throw new Error(
    "The add_note schema accepted empty content.",
  );
}

if (tooManyAddNoteTags.success) {
  throw new Error(
    "The add_note schema accepted more than 20 tags.",
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

let unsafeWritePathWasRejected = false;

try {
  await writeDataFile(
    "../package.json",
    [],
    notesDataSchema,
  );
} catch {
  unsafeWritePathWasRejected = true;
}

if (!unsafeWritePathWasRejected) {
  throw new Error(
    "The data file writer accepted a path outside the data directory.",
  );
}

const tooLongSearchNotes =
  searchNotesInputSchema.safeParse({
    query: "x".repeat(201),
  });

if (tooLongSearchNotes.success) {
  throw new Error(
    "The search_notes schema accepted a query longer than 200 characters.",
  );
}

const pathLikeNoteId =
  getNoteInputSchema.safeParse({
    note_id: "../etc/passwd",
  });

if (pathLikeNoteId.success) {
  throw new Error(
    "The get_note schema accepted a traversal-style note ID.",
  );
}

const unexpectedSearchNotesField =
  searchNotesInputSchema.safeParse({
    query: "MCP",
    url: "https://evil.example",
  });

if (unexpectedSearchNotesField.success) {
  throw new Error(
    "The search_notes schema accepted an unexpected field.",
  );
}

const oversizedStoredNote =
  noteDataSchema.safeParse({
    id: "note-999",
    title: "Oversized note",
    content: "x".repeat(10001),
    tags: ["security"],
    created_at: "2026-08-09T08:00:00.000Z",
  });

if (oversizedStoredNote.success) {
  throw new Error(
    "The note data schema accepted oversized note content.",
  );
}

let traversalPathRejected = false;

try {
  await readDataFile(
    "../etc/passwd",
    notesDataSchema,
  );
} catch {
  traversalPathRejected = true;
}

if (!traversalPathRejected) {
  throw new Error(
    "The data reader accepted ../etc/passwd.",
  );
}

const truncatedOutput = truncateText(
  "x".repeat(
    MAX_NOTE_RESPONSE_CONTENT_CHARS + 1,
  ),
  MAX_NOTE_RESPONSE_CONTENT_CHARS,
);

if (
  !truncatedOutput.truncated ||
  truncatedOutput.text.length >
    MAX_NOTE_RESPONSE_CONTENT_CHARS
) {
  throw new Error(
    "The note response output cap was not enforced.",
  );
}

const cappedResourceItems = capItems(
  Array.from(
    { length: MAX_RESOURCE_ITEMS + 1 },
    (_, index) => index,
  ),
  MAX_RESOURCE_ITEMS,
);

if (
  !cappedResourceItems.truncated ||
  cappedResourceItems.items.length !==
    MAX_RESOURCE_ITEMS
) {
  throw new Error(
    "The resource item cap was not enforced.",
  );
}

console.log("search_notes valid:", validSearchNotes);
console.log("search_faqs valid:", validSearchFaqs);
console.log("get_note valid:", validGetNote);
console.log("notes data valid:", validNotesData.length);
console.log("FAQ data valid:", validFaqsData.length);
console.log("list_notes valid:", validListNotes);
console.log("Unsafe data path rejected.");
console.log("add_note valid:", validAddNote);
console.log("Unsafe data write path rejected.");
console.log(
  "All tool input, fixture, and safe path checks passed.",
);
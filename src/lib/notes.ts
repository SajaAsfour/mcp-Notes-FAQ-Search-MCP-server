import { readDataFile } from "./read-data-file.js";
import {
  calculateSearchScore,
  createExcerpt,
  getSearchTerms,
} from "./search.js";
import { writeDataFile } from "./write-data-file.js";
import {
  noteDataSchema,
  notesDataSchema,
  type NoteData,
} from "../schemas/note-data.js";

export type NoteSearchResult = {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  created_at: string;
  score: number;
};

export type NoteListItem = {
  id: string;
  title: string;
  tags: string[];
};

export type NewNoteInput = {
  title: string;
  content: string;
  tags?: string[];
};

export type UpdateNoteInput = {
  note_id: string;
  title?: string;
  content?: string;
  tags?: string[];
};

let noteWriteQueue: Promise<void> =
  Promise.resolve();

export async function loadNotes(): Promise<NoteData[]> {
  return readDataFile("notes.json", notesDataSchema);
}

export async function saveNotes(
  notes: NoteData[],
): Promise<void> {
  await writeDataFile(
    "notes.json",
    notes,
    notesDataSchema,
  );
}

export function searchNotes(
  notes: NoteData[],
  query: string,
  limit = 5,
): NoteSearchResult[] {
  const searchTerms = getSearchTerms(query);
  const resultLimit = Math.min(Math.max(limit, 1), 20);

  return notes
    .map((note) => {
      const score = calculateSearchScore(searchTerms, [
        note.title,
        note.content,
        note.tags.join(" "),
      ]);

      return {
        id: note.id,
        title: note.title,
        excerpt: createExcerpt(note.content),
        tags: note.tags,
        created_at: note.created_at,
        score,
      };
    })
    .filter((note) => note.score > 0)
    .sort(
      (firstNote, secondNote) =>
        secondNote.score - firstNote.score ||
        firstNote.title.localeCompare(secondNote.title),
    )
    .slice(0, resultLimit);
}

export function getNoteById(
  notes: NoteData[],
  noteId: string,
): NoteData | undefined {
  return notes.find((note) => note.id === noteId);
}

export function listNotes(
  notes: NoteData[],
  tag?: string,
  limit = 5,
): NoteListItem[] {
  const resultLimit = Math.min(Math.max(limit, 1), 20);
  const normalizedTag = tag?.trim().toLowerCase();

  return notes
    .filter(
      (note) =>
        !normalizedTag ||
        note.tags.some(
          (currentTag) =>
            currentTag.toLowerCase() === normalizedTag,
        ),
    )
    .slice(0, resultLimit)
    .map((note) => ({
      id: note.id,
      title: note.title,
      tags: note.tags,
    }));
}

function createNextNoteId(
  notes: NoteData[],
): string {
  const usedIds = new Set(
    notes.map((note) => note.id),
  );

  let nextNumber =
    notes.reduce((largestNumber, note) => {
      const match = /^note-(\d+)$/u.exec(note.id);

      if (!match) {
        return largestNumber;
      }

      return Math.max(
        largestNumber,
        Number(match[1]),
      );
    }, 0) + 1;

  let candidateId: string;

  do {
    candidateId =
      `note-${String(nextNumber).padStart(3, "0")}`;

    nextNumber += 1;
  } while (usedIds.has(candidateId));

  return candidateId;
}

export function createNote(
  notes: NoteData[],
  input: NewNoteInput,
  createdAt = new Date().toISOString(),
): NoteData {
  return noteDataSchema.parse({
    id: createNextNoteId(notes),
    title: input.title.trim(),
    content: input.content.trim(),
    tags: (input.tags ?? []).map(
      (tag) => tag.trim(),
    ),
    created_at: createdAt,
  });
}

export async function addNoteSafely(
  input: NewNoteInput,
): Promise<NoteData> {
  let createdNote: NoteData | undefined;

  const operation = noteWriteQueue.then(
    async () => {
      const notes = await loadNotes();
      const note = createNote(
        notes,
        input,
      );

      await saveNotes([
        ...notes,
        note,
      ]);

      createdNote = note;
    },
  );

  noteWriteQueue = operation.catch(
    () => undefined,
  );

  await operation;

  if (!createdNote) {
    throw new Error(
      "Unable to create note.",
    );
  }

  return createdNote;
}

export async function updateNoteSafely(
  input: UpdateNoteInput,
): Promise<NoteData | undefined> {
  let updatedNote: NoteData | undefined;

  const operation = noteWriteQueue.then(
    async () => {
      const notes = await loadNotes();

      const noteIndex = notes.findIndex(
        (note) => note.id === input.note_id,
      );

      if (noteIndex < 0) {
        return;
      }

      const currentNote = notes[noteIndex];

      const note = noteDataSchema.parse({
        ...currentNote,

        title:
          input.title === undefined
            ? currentNote.title
            : input.title.trim(),

        content:
          input.content === undefined
            ? currentNote.content
            : input.content.trim(),

        tags:
          input.tags === undefined
            ? currentNote.tags
            : input.tags.map((tag) => tag.trim()),
      });

      const updatedNotes = [...notes];
      updatedNotes[noteIndex] = note;

      await saveNotes(updatedNotes);

      updatedNote = note;
    },
  );

  noteWriteQueue = operation.catch(
    () => undefined,
  );

  await operation;

  return updatedNote;
}

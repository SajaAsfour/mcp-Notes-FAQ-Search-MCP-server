import { readDataFile } from "./read-data-file.js";
import {
  calculateSearchScore,
  createExcerpt,
  getSearchTerms,
} from "./search.js";
import {
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

export async function loadNotes(): Promise<NoteData[]> {
  return readDataFile("notes.json", notesDataSchema);
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
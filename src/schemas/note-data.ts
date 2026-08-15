import { z } from "zod/v4";

export const noteDataSchema = z
  .object({
    id: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .regex(/^note-\d{3,}$/u),
    title: z
      .string()
      .trim()
      .min(1)
      .max(200),
    content: z
      .string()
      .trim()
      .min(1)
      .max(10000),
    tags: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(50),
      )
      .max(20),
    created_at: z.iso.datetime(),
  })
  .strict();

export const notesDataSchema = z
  .array(noteDataSchema)
  .max(
    500,
    "Notes collection must not contain more than 500 notes",
  )
  .superRefine((notes, context) => {
    const ids = new Set<string>();

    notes.forEach((note, index) => {
      if (ids.has(note.id)) {
        context.addIssue({
          code: "custom",
          path: [index, "id"],
          message: `Duplicate note ID: ${note.id}`,
        });
      }

      ids.add(note.id);
    });
  });

export type NoteData = z.infer<typeof noteDataSchema>;

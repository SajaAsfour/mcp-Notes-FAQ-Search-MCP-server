import { z } from "zod/v4";

export const noteDataSchema = z
  .object({
    id: z.string().trim().min(1),
    title: z.string().trim().min(1),
    content: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)),
    created_at: z.iso.datetime(),
  })
  .strict();

export const notesDataSchema = z
  .array(noteDataSchema)
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
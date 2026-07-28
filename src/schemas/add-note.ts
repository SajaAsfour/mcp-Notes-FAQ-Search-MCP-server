import { z } from "zod/v4";

// Tool: add_note
export const addNoteInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Note title is required")
    .max(200, "Note title must not exceed 200 characters")
    .describe("Title of the new note"),

  content: z
    .string()
    .trim()
    .min(1, "Note content is required")
    .max(10000, "Note content must not exceed 10000 characters")
    .describe("Full text content of the new note"),

  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Tag must not be empty")
        .max(50, "Tag must not exceed 50 characters"),
    )
    .max(20, "A note must not contain more than 20 tags")
    .optional()
    .describe("Optional tags used to organize the note"),
});

export type AddNoteInput = z.infer<typeof addNoteInputSchema>;
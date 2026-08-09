import { z } from "zod/v4";

// Tool: get_note
export const getNoteInputSchema = z
  .object({
    note_id: z
      .string()
      .trim()
      .min(1, "Note ID is required")
      .max(100, "Note ID must not exceed 100 characters")
      .regex(
        /^note-\d{3,}$/u,
        "Note ID must use the format note-001",
      )
      .describe("Unique ID of the locally stored note to retrieve"),
  })
  .strict();

export type GetNoteInput = z.infer<typeof getNoteInputSchema>;

import { z } from "zod/v4";

// Tool: get_note
export const getNoteInputSchema = z.object({
  note_id: z
    .string()
    .trim()
    .min(1, "Note ID is required")
    .max(100, "Note ID must not exceed 100 characters")
    .describe("Unique ID of the locally stored note to retrieve"),
});

export type GetNoteInput = z.infer<typeof getNoteInputSchema>;
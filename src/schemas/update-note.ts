import { z } from "zod/v4";

// Tool: update_note
export const updateNoteInputSchema = z
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
      .describe("Unique ID of the locally stored note to update"),

    title: z
      .string()
      .trim()
      .min(1, "Note title must not be empty")
      .max(200, "Note title must not exceed 200 characters")
      .optional()
      .describe("Optional replacement title"),

    content: z
      .string()
      .trim()
      .min(1, "Note content must not be empty")
      .max(10000, "Note content must not exceed 10000 characters")
      .optional()
      .describe("Optional replacement content"),

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
      .describe("Optional replacement tags"),
  })
  .strict()
  .refine(
    (input) =>
      input.title !== undefined ||
      input.content !== undefined ||
      input.tags !== undefined,
    {
      message:
        "At least one of title, content, or tags must be provided",
    },
  );

export type UpdateNoteInput =
  z.infer<typeof updateNoteInputSchema>;
  
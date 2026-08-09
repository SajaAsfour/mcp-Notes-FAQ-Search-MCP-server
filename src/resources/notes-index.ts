import type { McpServer } from "@modelcontextprotocol/server";

import { loadNotes } from "../lib/notes.js";
import {
  capItems,
  MAX_RESOURCE_ITEMS,
} from "../lib/output.js";

export function registerNotesIndexResource(server: McpServer): void {
  server.registerResource(
    "notes_index",
    "notes://index",
    {
      title: "Notes Index",
      description:
        "Read-only index of locally stored notes with basic metadata",
      mimeType: "application/json",
    },
    async (uri) => {
      try {
        const notes = await loadNotes();

        const cappedNotes = capItems(
          notes,
          MAX_RESOURCE_ITEMS,
        );

        const noteIndex = cappedNotes.items.map((note) => ({
          id: note.id,
          title: note.title,
          tags: note.tags,
          created_at: note.created_at,
        }));

        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify(
                {
                  notes: noteIndex,
                  total_count: cappedNotes.total,
                  returned_count: noteIndex.length,
                  truncated: cappedNotes.truncated,
                  max_items: MAX_RESOURCE_ITEMS,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        const reason =
          error instanceof Error
            ? error.message
            : "Unknown error";

        console.error(
          `[resource:notes_index] ${reason}`,
        );

        throw new Error(
          "Unable to read the notes index resource.",
        );
      }
    },
  );
}
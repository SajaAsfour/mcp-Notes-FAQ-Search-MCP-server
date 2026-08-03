import type { McpServer } from "@modelcontextprotocol/server";

import { loadNotes } from "../lib/notes.js";

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

        const noteIndex = notes.map((note) => ({
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
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Failed to read notes index resource:", error);
        throw new Error("Unable to read the notes index resource.");
      }
    },
  );
}
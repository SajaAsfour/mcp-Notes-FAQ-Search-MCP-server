import type { McpServer } from "@modelcontextprotocol/server";

import { loadFaqs } from "../lib/faqs.js";

export function registerFaqResource(server: McpServer): void {
  server.registerResource(
    "faq",
    "notes://faq",
    {
      title: "Frequently Asked Questions",
      description:
        "Read-only collection of locally stored FAQ questions and answers",
      mimeType: "application/json",
    },
    async (uri) => {
      try {
        const faqs = await loadFaqs();

        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify(
                {
                  faqs,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Failed to read FAQ resource:", error);
        throw new Error("Unable to read the FAQ resource.");
      }
    },
  );
}
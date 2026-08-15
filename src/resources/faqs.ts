import type { McpServer } from "@modelcontextprotocol/server";

import {
  capItems,
  MAX_FAQ_RESPONSE_ANSWER_CHARS,
  MAX_RESOURCE_ITEMS,
  truncateText,
} from "../lib/output.js";
import { loadFaqs } from "../lib/faqs.js";

export function registerFaqResource(server: McpServer): void {
  server.registerResource(
    "faq",
    "faq://index",
    {
      title: "Frequently Asked Questions",
      description:
        "Read-only collection of locally stored FAQ questions and answers",
      mimeType: "application/json",
    },
    async (uri) => {
      try {
        const faqs = await loadFaqs();

        const cappedFaqs = capItems(
          faqs,
          MAX_RESOURCE_ITEMS,
        );

        const safeFaqs = cappedFaqs.items.map((faq) => {
          const safeAnswer = truncateText(
            faq.answer,
            MAX_FAQ_RESPONSE_ANSWER_CHARS,
          );

          return {
            ...faq,
            answer: safeAnswer.text,
            answer_truncated: safeAnswer.truncated,
            answer_original_characters:
              safeAnswer.originalCharacters,
          };
        });

        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify(
                {
                  faqs: safeFaqs,
                  total_count: cappedFaqs.total,
                  returned_count: safeFaqs.length,
                  truncated: cappedFaqs.truncated,
                  max_items: MAX_RESOURCE_ITEMS,
                  max_answer_characters:
                    MAX_FAQ_RESPONSE_ANSWER_CHARS,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        const reason =
          error instanceof Error ? error.message : "Unknown error";

        console.error(`[resource:faq] ${reason}`);

        throw new Error("Unable to read the FAQ resource.");
      }
    },
  );
}
import { z } from "zod/v4";

export const faqDataSchema = z
  .object({
    id: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .regex(/^faq-\d{3,}$/u),
    question: z
      .string()
      .trim()
      .min(1)
      .max(500),
    answer: z
      .string()
      .trim()
      .min(1)
      .max(10000),
  })
  .strict();

export const faqsDataSchema = z
  .array(faqDataSchema)
  .max(
    500,
    "FAQ collection must not contain more than 500 entries",
  )
  .superRefine((faqs, context) => {
    const ids = new Set<string>();

    faqs.forEach((faq, index) => {
      if (ids.has(faq.id)) {
        context.addIssue({
          code: "custom",
          path: [index, "id"],
          message: `Duplicate FAQ ID: ${faq.id}`,
        });
      }

      ids.add(faq.id);
    });
  });

export type FaqData = z.infer<typeof faqDataSchema>;
import { readDataFile } from "./read-data-file.js";
import {
  calculateSearchScore,
  getSearchTerms,
} from "./search.js";
import {
  faqsDataSchema,
  type FaqData,
} from "../schemas/faq-data.js";

export type FaqSearchResult = {
  id: string;
  question: string;
  answer: string;
  score: number;
};

export async function loadFaqs(): Promise<FaqData[]> {
  return readDataFile("faqs.json", faqsDataSchema);
}

export function searchFaqs(
  faqs: FaqData[],
  query: string,
  limit = 5,
): FaqSearchResult[] {
  const searchTerms = getSearchTerms(query);
  const resultLimit = Math.min(Math.max(limit, 1), 20);

  return faqs
    .map((faq) => {
      const score = calculateSearchScore(searchTerms, [
        faq.question,
        faq.answer,
      ]);

      return {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        score,
      };
    })
    .filter((faq) => faq.score > 0)
    .sort(
      (firstFaq, secondFaq) =>
        secondFaq.score - firstFaq.score ||
        firstFaq.question.localeCompare(secondFaq.question),
    )
    .slice(0, resultLimit);
}
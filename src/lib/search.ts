export function normalizeText(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSearchTerms(query: string): string[] {
  return [
    ...new Set(
      normalizeText(query)
        .split(" ")
        .filter((term) => term.length > 0),
    ),
  ];
}

export function calculateSearchScore(
  terms: string[],
  values: string[],
): number {
  const searchableText = normalizeText(values.join(" "));

  return terms.reduce(
    (score, term) =>
      searchableText.includes(term) ? score + 1 : score,
    0,
  );
}

export function createExcerpt(
  content: string,
  maximumLength = 160,
): string {
  const normalizedContent = content.replace(/\s+/g, " ").trim();

  if (normalizedContent.length <= maximumLength) {
    return normalizedContent;
  }

  return `${normalizedContent
    .slice(0, maximumLength - 1)
    .trimEnd()}…`;
}
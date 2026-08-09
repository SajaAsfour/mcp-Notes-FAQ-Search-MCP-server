export const MAX_NOTE_RESPONSE_CONTENT_CHARS = 4000;
export const MAX_FAQ_RESPONSE_ANSWER_CHARS = 1000;
export const MAX_RESOURCE_ITEMS = 20;

export type TruncatedText = {
  text: string;
  truncated: boolean;
  originalCharacters: number;
};

export function truncateText(
  value: string,
  maxCharacters: number,
): TruncatedText {
  if (!Number.isInteger(maxCharacters) || maxCharacters < 1) {
    throw new Error(
      "Maximum output character count must be a positive integer.",
    );
  }

  const originalCharacters = value.length;

  if (originalCharacters <= maxCharacters) {
    return {
      text: value,
      truncated: false,
      originalCharacters,
    };
  }

  return {
    text: `${value
      .slice(0, maxCharacters - 1)
      .trimEnd()}…`,
    truncated: true,
    originalCharacters,
  };
}

export function capItems<T>(
  items: readonly T[],
  maxItems: number,
): {
  items: T[];
  total: number;
  truncated: boolean;
} {
  if (!Number.isInteger(maxItems) || maxItems < 1) {
    throw new Error(
      "Maximum output item count must be a positive integer.",
    );
  }

  return {
    items: items.slice(0, maxItems),
    total: items.length,
    truncated: items.length > maxItems,
  };
}
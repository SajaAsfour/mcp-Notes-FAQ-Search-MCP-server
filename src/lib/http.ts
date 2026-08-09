export const DEFAULT_FETCH_TIMEOUT_MS = 8000;
export const MAX_FETCH_TIMEOUT_MS = 10000;

// This MCP server is currently fully offline.
// Add exact approved hosts here only when a real
// server-controlled HTTP data source is introduced.
const ALLOWED_FETCH_HOSTS =
  new Set<string>();

export function validateFetchUrl(
  url: string,
): URL {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(
      "Request URL is invalid.",
    );
  }

  if (parsedUrl.protocol !== "https:") {
    throw new Error(
      "Only HTTPS requests are allowed.",
    );
  }

  if (
    !ALLOWED_FETCH_HOSTS.has(
      parsedUrl.hostname,
    )
  ) {
    throw new Error(
      "Request host is not allowlisted.",
    );
  }

  return parsedUrl;
}

export async function fetchJson(
  url: string,
  {
    timeoutMs = DEFAULT_FETCH_TIMEOUT_MS,
  }: {
    timeoutMs?: number;
  } = {},
): Promise<unknown> {
  if (
    !Number.isInteger(timeoutMs) ||
    timeoutMs < 1 ||
    timeoutMs > MAX_FETCH_TIMEOUT_MS
  ) {
    throw new Error(
      `Request timeout must be between 1 and ${MAX_FETCH_TIMEOUT_MS} milliseconds.`,
    );
  }

  const safeUrl = validateFetchUrl(url);

  try {
    const response = await fetch(
      safeUrl,
      {
        signal:
          AbortSignal.timeout(timeoutMs),
        redirect: "error",
      },
    );

    if (!response.ok) {
      throw new Error(
        `Remote service returned HTTP ${response.status}.`,
      );
    }

    const payload: unknown =
      await response.json();

    return payload;
  } catch (error) {
    if (
      error instanceof Error &&
      (
        error.name === "TimeoutError" ||
        error.name === "AbortError"
      )
    ) {
      throw new Error(
        `Remote request timed out after ${timeoutMs} ms.`,
      );
    }

    if (
      error instanceof Error &&
      error.message.startsWith(
        "Remote service returned HTTP ",
      )
    ) {
      throw error;
    }

    throw new Error(
      "Remote request failed.",
    );
  }
}
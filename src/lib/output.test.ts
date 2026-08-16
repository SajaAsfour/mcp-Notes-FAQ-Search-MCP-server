import assert from "node:assert/strict";
import { test } from "node:test";

import { truncateText } from "./output.js";

test("truncateText keeps text unchanged when it is within the limit", () => {
  const result = truncateText("MCP notes", 20);

  assert.deepEqual(result, {
    text: "MCP notes",
    truncated: false,
    originalCharacters: 9,
  });
});

test("truncateText truncates text and reports the original length", () => {
  const result = truncateText("abcdef", 5);

  assert.deepEqual(result, {
    text: "abcd…",
    truncated: true,
    originalCharacters: 6,
  });
});

test("truncateText rejects an invalid maximum character limit", () => {
  assert.throws(
    () => truncateText("MCP", 0),
    /Maximum output character count must be a positive integer/,
  );
});
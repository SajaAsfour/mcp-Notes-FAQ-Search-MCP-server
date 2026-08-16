import assert from "node:assert/strict";
import { test } from "node:test";

import { getSearchTerms } from "./search.js";

test("getSearchTerms normalizes and removes duplicate search terms", () => {
  const terms = getSearchTerms("MCP, tools MCP! resources");

  assert.deepEqual(terms, ["mcp", "tools", "resources"]);
});

test("getSearchTerms returns an empty array for whitespace-only input", () => {
  const terms = getSearchTerms("   ");

  assert.deepEqual(terms, []);
});

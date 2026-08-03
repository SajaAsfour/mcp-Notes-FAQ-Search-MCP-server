import { readFile } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";

import type { ZodType } from "zod/v4";

const dataDirectory = resolve(process.cwd(), "data");

export function resolveDataFilePath(fileName: string): string {
    const trimmedFileName = fileName.trim();

  if (!trimmedFileName) {
    throw new Error("Data file name is required.");
  }

  const pathParts = trimmedFileName.split(/[\\/]+/u);

  if (isAbsolute(trimmedFileName) || pathParts.includes("..")) {
    throw new Error("Data file path must stay inside the data directory.");
  }

  const filePath = resolve(dataDirectory, trimmedFileName);
  const pathFromDataDirectory = relative(dataDirectory, filePath);

  if (
    pathFromDataDirectory === ".." ||
    pathFromDataDirectory.startsWith(`..${sep}`) ||
    isAbsolute(pathFromDataDirectory)
  ) {
    throw new Error("Data file path must stay inside the data directory.");
  }

  return filePath;
}

export async function readDataFile<T>(
  fileName: string,
  schema: ZodType<T>,
): Promise<T> {
  const filePath = resolveDataFilePath(fileName);

  let rawFile: string;

  try {
    rawFile = await readFile(filePath, "utf8");
  } catch {
    throw new Error(`Unable to read data file "${fileName}".`);
  }

  if (!rawFile.trim()) {
    throw new Error(`Data file "${fileName}" is empty.`);
  }

  let parsedPayload: unknown;

  try {
    parsedPayload = JSON.parse(rawFile);
  } catch {
    throw new Error(`Data file "${fileName}" contains invalid JSON.`);
  }

  const validationResult = schema.safeParse(parsedPayload);

  if (!validationResult.success) {
    const firstIssue = validationResult.error.issues[0];
    const issuePath =
      firstIssue && firstIssue.path.length > 0
        ? firstIssue.path.join(".")
        : "root";
    const issueMessage =
      firstIssue?.message ?? "Unknown validation error";

    throw new Error(
      `Data file "${fileName}" has an invalid shape at ${issuePath}: ${issueMessage}`,
    );
  }

  return validationResult.data;
}
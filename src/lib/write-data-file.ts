import {
  rename,
  rm,
  writeFile,
} from "node:fs/promises";

import type { ZodType } from "zod/v4";

import { resolveDataFilePath } from "./read-data-file.js";

export async function writeDataFile<T>(
  fileName: string,
  data: unknown,
  schema: ZodType<T>,
): Promise<T> {
  const filePath = resolveDataFilePath(fileName);
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    const firstIssue = validationResult.error.issues[0];
    const issuePath =
      firstIssue && firstIssue.path.length > 0
        ? firstIssue.path.join(".")
        : "root";
    const issueMessage =
      firstIssue?.message ?? "Unknown validation error";

    throw new Error(
      `Refusing to write invalid data at ${issuePath}: ${issueMessage}`,
    );
  }

  const temporaryFilePath =
    `${filePath}.${process.pid}.${Date.now()}.tmp`;

  const serializedData =
    `${JSON.stringify(validationResult.data, null, 2)}\n`;

  try {
    await writeFile(
      temporaryFilePath,
      serializedData,
      {
        encoding: "utf8",
        flag: "wx",
      },
    );

    await rename(temporaryFilePath, filePath);
  } catch {
    await rm(
      temporaryFilePath,
      { force: true },
    ).catch(() => undefined);

    throw new Error(
      `Unable to write data file "${fileName}".`,
    );
  }

  return validationResult.data;
}
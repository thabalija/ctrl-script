import { EntityTable } from "dexie";
import { FileItem } from "../../../db";
import { extractFileItemDataFromFile } from "./extractFileItemDataFromFile";

export async function bulkAddFileItemToDb(
  files: Array<File>,
  entityTable: EntityTable<FileItem, "id">,
) {
  const fileItems = files.map((file) => extractFileItemDataFromFile(file));

  await entityTable.bulkAdd(fileItems);
}

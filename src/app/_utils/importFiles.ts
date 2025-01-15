import { EntityTable } from "dexie";
import { FileItem } from "../../../db";
import { bulkAddFileItemToDb } from "./bulkAddFileItemToDb";

export function importFiles(
  fileList: FileList | null,
  entityTable: EntityTable<FileItem, "id">,
  onImportDone: () => unknown,
): void {
  if (!fileList?.length) {
    return;
  }

  const worker = new Worker(
    new URL("../_workers/importFilesWorker.ts", import.meta.url),
  );

  worker.onmessage = async (message) => {
    await bulkAddFileItemToDb(message.data, entityTable);
    onImportDone();
    worker.terminate();
  };

  worker.postMessage({ files: Array.from(fileList) });
}

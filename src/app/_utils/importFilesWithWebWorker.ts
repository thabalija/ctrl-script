import { EntityTable } from "dexie";
import { FileItem } from "../../../db";
import { bulkAddFileItemToDb } from "./bulkAddFileItemToDb";
import { WorkerMessageType } from "../_constants/workerMessageType";

export function importFilesWithWebWorker(
  fileList: FileList | null,
  entityTable: EntityTable<FileItem, "id">,
  onImportDone: () => unknown,
): void {
  if (!fileList?.length) {
    return;
  }

  const worker = new Worker(new URL("../_workers/worker.ts", import.meta.url));

  worker.onmessage = async (message) => {
    await bulkAddFileItemToDb(message.data, entityTable);
    onImportDone();
    worker.terminate();
  };

  worker.postMessage({
    files: Array.from(fileList),
    type: WorkerMessageType.IMPORT_FILES,
  });
}

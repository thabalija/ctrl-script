import { WorkerMessageType } from "../_constants/workerMessageType";
import { unzipFiles } from "./_utils/unzipFiles";

type UnzipFilesWorkerMessage = {
  type: WorkerMessageType.IMPORT_FILES;
  files: Array<File>;
};

type WorkerMessage = UnzipFilesWorkerMessage;

const onmessage = async (event: MessageEvent<WorkerMessage>) => {
  switch (event.data.type) {
    case WorkerMessageType.IMPORT_FILES:
      if (!event.data.files?.length) {
        break;
      }

      const files = await unzipFiles(event.data.files);
      postMessage(files);
      break;

    default:
      break;
  }
};

addEventListener("message", onmessage);

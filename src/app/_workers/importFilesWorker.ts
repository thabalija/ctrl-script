import * as zip from "@zip.js/zip.js";

type UnzipFileWorkerMessage = {
  files: Array<File>;
};

const onmessage = async (event: MessageEvent<UnzipFileWorkerMessage>) => {
  const filesForImport = [];

  for (const file of event.data.files) {
    const extension = file.name.split(".").pop() || "txt";

    if (extension === "zip") {
      const unzippedFiles = await new zip.ZipReader(
        new zip.BlobReader(file),
      ).getEntries();

      for (const zipEntry of unzippedFiles) {
        if (zipEntry.getData) {
          const fileData = await zipEntry.getData(new zip.BlobWriter());
          // await addEntityToEntityTable(fileFromZip, entityTable);
          filesForImport.push(new File([fileData], zipEntry.filename));
        }
      }
    } else {
      filesForImport.push(file);
    }
  }

  postMessage(filesForImport);
};

addEventListener("message", onmessage);

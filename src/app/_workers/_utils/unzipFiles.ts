import * as zip from "@zip.js/zip.js";

export async function unzipFiles(files: Array<File>): Promise<Array<File>> {
  const filesForImport = [];

  for (const file of files) {
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

  return filesForImport;
}

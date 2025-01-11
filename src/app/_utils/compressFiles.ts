import * as zip from "@zip.js/zip.js";
import { FileItem } from "../../../db";
import { renameFile } from "./renameFile";

export async function compressFiles(files: Array<FileItem>): Promise<Blob> {
  const zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"), {
    bufferedWrite: true,
  });

  const zipFileNames: Array<string> = [];

  for (const file of files) {
    let fileForDownload = file.file;

    const zipContainsFileWithSameName = Boolean(
      zipFileNames.find((fileName) => fileName === fileForDownload.name),
    );

    if (zipContainsFileWithSameName) {
      fileForDownload = renameFile(
        file.file,
        `${file.name}_modified.${file.extension}`,
      );
    }

    zipFileNames.push(fileForDownload.name);
    await zipWriter.add(
      fileForDownload.name,
      new zip.BlobReader(fileForDownload),
    );
  }

  return await zipWriter.close();
}

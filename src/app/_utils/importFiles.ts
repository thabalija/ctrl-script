import * as zip from "@zip.js/zip.js";
import { EntityTable } from "dexie";
import { FileItem } from "../../../db";

export async function importFiles(
  fileList: FileList | null,
  entityTable: EntityTable<FileItem, "id">,
) {
  if (!fileList?.length) {
    return;
  }

  for (const file of Array.from(fileList)) {
    const extension = file.name.split(".").pop() || "txt";

    if (extension === "zip") {
      const unzippedFiles = await new zip.ZipReader(
        new zip.BlobReader(file),
      ).getEntries();

      for (const zipEntry of unzippedFiles) {
        if (zipEntry.getData) {
          const fileData = await zipEntry.getData(new zip.BlobWriter());
          // await addEntityToEntityTable(fileFromZip, entityTable);
          const fileFromZip = new File([fileData], zipEntry.filename);
          await addEntityToEntityTable(fileFromZip, entityTable);
        }
      }
    } else {
      await addEntityToEntityTable(file, entityTable);
    }
  }
}

async function addEntityToEntityTable(
  file: File,
  entityTable: EntityTable<FileItem, "id">,
) {
  const fileNameParts = file.name.split(".");
  const extension = fileNameParts.pop() || "txt";
  const name = fileNameParts.join("");

  await entityTable.add({
    name,
    extension,
    file,
  });
}

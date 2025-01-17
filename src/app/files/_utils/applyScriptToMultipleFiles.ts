import { db, FileItem } from "../../../../db";

export async function applyScriptToMultipleFiles(
  fileItems: Array<FileItem>,
  script: string,
): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const scriptFunction = new Function(script);

  for (const fileItem of fileItems) {
    const fileText = await fileItem.file.text();

    const result = scriptFunction.call(null, fileText);

    if (!(typeof result === "string")) {
      throw new Error("Script must return a string.");
    }

    const newFile = new File([result], fileItem.name, {
      type: fileItem.file.type,
    });

    fileItem.file = newFile;

    await db.files.put(fileItem);
  }

  return await db.files.bulkPut(fileItems);
}

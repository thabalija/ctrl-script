import { FileItem, db } from "../../../../../db";

export async function saveScript(
  scriptName: string,
  script: string,
  fileItem: FileItem,
) {
  const newFile = new File([script || ""], scriptName, {
    type: "text/javascript",
  });

  fileItem.name = scriptName;
  fileItem.file = newFile;
  await db.scripts.put(fileItem);
}

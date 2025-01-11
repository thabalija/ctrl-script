import { db, FileItem } from "../../../../../db";

export async function createScript(
  scriptName: string,
  script: string,
): Promise<FileItem | undefined> {
  const newFile = new File([script || ""], scriptName, {
    type: "text/javascript",
  });

  const newScript = {
    name: scriptName,
    extension: "js",
    file: newFile,
  };

  const newScriptId = await db.scripts.add(newScript);
  return await db.scripts.get(newScriptId);
}

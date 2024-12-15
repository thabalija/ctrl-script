import Dexie, { type EntityTable } from "dexie";

interface FileItem {
  id: string;
  name: string;
  extension: string;
  file: File;
  versions: Array<File>;
}

const db = new Dexie("CTRLScriptData") as Dexie & {
  files: EntityTable<FileItem, "id">;
  scripts: EntityTable<FileItem, "id">;
};

db.version(1).stores({
  files: "++id, name, extension, file, versions",
  scripts: "++id, name, extension, file, versions",
});

export type { FileItem };
export { db };

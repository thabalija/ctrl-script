import Dexie, { type EntityTable } from "dexie";

interface FileItem {
  id: number;
  name: string;
  extension: string;
  file: File;
}

const db = new Dexie("CTRLScriptData") as Dexie & {
  files: EntityTable<FileItem, "id">;
  scripts: EntityTable<FileItem, "id">;
};

db.version(1).stores({
  files: "++id, name, extension, file, versions",
  scripts: "++id, name, extension, file, versions",
});

export { db };
export type { FileItem };

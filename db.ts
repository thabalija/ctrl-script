import Dexie, { type EntityTable } from "dexie";

interface IFileItem {
  id: number;
  name: string;
  extension: string;
  file: File;
}

const db = new Dexie("CTRLScriptData") as Dexie & {
  files: EntityTable<IFileItem, "id">;
  scripts: EntityTable<IFileItem, "id">;
};

db.version(1).stores({
  files: "++id, name, extension, file, versions",
  scripts: "++id, name, extension, file, versions",
});

export { db };
export type { IFileItem as FileItem };

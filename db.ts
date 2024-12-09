import Dexie, { type EntityTable } from "dexie";

interface FileItem {
  id: string;
  name: string;
  extension: string;
  file: File;
}

const db = new Dexie("FileItems") as Dexie & {
  fileItems: EntityTable<FileItem, "id">;
};

db.version(1).stores({
  fileItems: "++id, name, extension, file",
});

export type { FileItem };
export { db };

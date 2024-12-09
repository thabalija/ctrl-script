"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../db";
import { FileItem } from "../FileItem/FileItem";

export function FileList() {
  const fileList = useLiveQuery(() => db.fileItems.toArray());

  if (!fileList) return null;

  return (
    <>
      {fileList.map((fileItem) => (
        <FileItem key={fileItem.id} fileItem={fileItem} />
      ))}
    </>
  );
}

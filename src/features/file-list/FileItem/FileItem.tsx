"use client";

import { db, FileItem as FileItemModel } from "../../../../db";

export interface IFileItemProps {
  fileItem: FileItemModel;
}

export function FileItem({ fileItem }: IFileItemProps) {
  function deleteFileItem() {
    db.fileItems.delete(fileItem.id);
  }
  return (
    <p>
      <strong>{fileItem.name}</strong> <span>({fileItem.extension})</span>
      <button onClick={deleteFileItem}>Remove</button>
    </p>
  );
}

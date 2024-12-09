"use client";

import { Button } from "@chakra-ui/react";
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
      <Button onClick={deleteFileItem} type="button">
        Remove
      </Button>
    </p>
  );
}

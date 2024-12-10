"use client";

import { FileList } from "../../features/file-list/FileList/FileList";
import { FileUpload } from "../../features/file-upload/FileUpload/FileUpload";

export default function Files() {
  return (
    <>
      <FileUpload />
      <FileList />
    </>
  );
}

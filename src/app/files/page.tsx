"use client";

import { FileUpload } from "../../core/file-upload/FileUpload/FileUpload";
import { FileList } from "../../features/file-list/FileList/FileList";
import { Navigation } from "../../features/navigation/Navigation/Navigation";

export default function Files() {
  return (
    <>
      <Navigation />

      <FileUpload />

      <FileList />
    </>
  );
}

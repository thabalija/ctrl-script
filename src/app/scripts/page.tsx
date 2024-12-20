"use client";

import { Button, Container, Heading } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FileItem } from "../../../db";
import { FileTable } from "../../features/file-table/FileTable/FileTable";
import { FileDropzone } from "../../features/file-upload/FileDropzone/FileDropzone";

export default function Scripts() {
  const scripts = useLiveQuery(() => db.scripts.toArray());
  function onDeleteScript(fileItem: FileItem) {
    db.scripts.delete(fileItem.id);
  }

  async function onAddFiles(fileList: FileList | null) {
    if (!fileList?.length) {
      return;
    }

    Array.from(fileList).forEach(async (file) => {
      const fileNameParts = file.name.split(".");
      const extension = fileNameParts.pop() || "js";
      const name = fileNameParts.join("");

      await db.scripts.add({
        name,
        extension,
        file,
        versions: [file],
      });
    });
  }

  return (
    <Container>
      <FileDropzone onAddFiles={onAddFiles} />
      <Heading as="h1">Scripts</Heading>
      <FileTable files={scripts} onDeleteFileItem={onDeleteScript} />
      <Button>Download all files</Button>
    </Container>
  );
}

"use client";

import { Button, Heading } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../db";
import { FileUpload } from "../../file-upload/FileUpload/FileUpload";
import { FilesTable } from "../../files-table/FilesTable/FilesTable";

export default function ScriptsContainer() {
  const scripts = useLiveQuery(() => db.scripts.toArray());

  async function onAddFiles(fileList: FileList | null) {
    if (!fileList?.length) {
      return;
    }

    Array.from(fileList).forEach(async (file) => {
      await db.scripts.add({
        name: file.name,
        extension: file.name.split(".").pop() || "",
        file: file,
        versions: [file],
      });
    });
  }

  return (
    <>
      <FileUpload onAddFiles={onAddFiles} />
      <Heading as="h1">Scripts</Heading>
      <FilesTable files={scripts} />
      <Button>Download all files</Button>
    </>
  );
}

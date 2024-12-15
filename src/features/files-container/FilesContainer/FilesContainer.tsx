"use client";

import { Button, Flex, Heading } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../db";
import { FileUpload } from "../../file-upload/FileUpload/FileUpload";
import { FilesTable } from "../../files-table/FilesTable/FilesTable";

export default function FilesContainer() {
  const files = useLiveQuery(() => db.files.toArray());

  async function onAddFiles(fileList: FileList | null) {
    if (!fileList?.length) {
      return;
    }

    Array.from(fileList).forEach(async (file) => {
      await db.files.add({
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
      <Heading as="h1">Files</Heading>
      <FilesTable files={files} />
      <Flex>
        <Button>Execute value</Button>
        <Button>Download all files</Button>
      </Flex>
    </>
  );
}

"use client";

import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FileItem } from "../../../db";
import { FileTable } from "../../features/file-table/FileTable/FileTable";
import { FileDropzone } from "../../features/file-upload/FileDropzone/FileDropzone";
import { compressFiles } from "../../helpers/compress-files";
import { downloadFile } from "../../helpers/download-file";
import { importFiles } from "../../helpers/import-files";

export default function FilesContainer() {
  const files = useLiveQuery(() => db.files.toArray());
  function onDeleteFile(fileItem: FileItem) {
    db.files.delete(fileItem.id);
  }

  async function onAddFiles(fileList: FileList | null) {
    await importFiles(fileList, db.files);
  }

  async function onDownloadAllFiles() {
    if (!files?.length) {
      return;
    }

    const compressedFile = await compressFiles(files);
    downloadFile(compressedFile, "files.zip");
  }

  return (
    <Container>
      <FileDropzone onAddFiles={onAddFiles} />
      <Heading as="h1">Files</Heading>
      <FileTable files={files} onDeleteFileItem={onDeleteFile} />
      <Flex>
        <Button>Execute value</Button>
        <Button onClick={onDownloadAllFiles}>Download all files</Button>
      </Flex>
    </Container>
  );
}

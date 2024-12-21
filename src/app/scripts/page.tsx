"use client";

import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FileItem } from "../../../db";
import { FileTable } from "../../features/file-table/FileTable/FileTable";
import { FileDropzone } from "../../features/file-upload/FileDropzone/FileDropzone";
import { importFiles } from "../../helpers/import-files";
import { compressFiles } from "../../helpers/compress-files";
import { downloadFile } from "../../helpers/download-file";

export default function Scripts() {
  const scripts = useLiveQuery(() => db.scripts.toArray());
  function onDeleteScript(fileItem: FileItem) {
    db.scripts.delete(fileItem.id);
  }

  async function onAddScripts(fileList: FileList | null) {
    await importFiles(fileList, db.scripts);
  }

  async function onDownloadAllFiles() {
    if (!scripts?.length) {
      return;
    }

    const compressedFile = await compressFiles(scripts);
    downloadFile(compressedFile, "files.zip");
  }

  return (
    <Container>
      <Box mt="32px" mb="32px">
        <FileDropzone onAddFiles={onAddScripts} />
      </Box>
      <Heading as="h1">Scripts</Heading>
      <FileTable files={scripts} onDeleteFileItem={onDeleteScript} />

      <Button onClick={onDownloadAllFiles}>Download all scripts</Button>
    </Container>
  );
}

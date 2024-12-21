"use client";

import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { LuHardDriveDownload } from "react-icons/lu";
import { db, FileItem } from "../../../db";
import { Loader } from "../../core/loader/Loader";
import { FileTable } from "../../features/file-table/FileTable/FileTable";
import { FileDropzone } from "../../features/file-upload/FileDropzone/FileDropzone";
import { compressFiles } from "../../helpers/compress-files";
import { downloadFile } from "../../helpers/download-file";
import { importFiles } from "../../helpers/import-files";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Scripts() {
  const scripts = useLiveQuery(() => db.scripts.toArray());
  function onDeleteScript(fileItem: FileItem) {
    db.scripts.delete(fileItem.id);
  }

  function onRemoveScripts() {
    db.scripts.clear();
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

  const isLoading = scripts === undefined;

  const tableContent = scripts?.length ? (
    <>
      <Box margin="32px 0">
        <Heading as="h1" marginBottom="24px">
          Scripts
        </Heading>
        <FileTable files={scripts} onDeleteFileItem={onDeleteScript} />
      </Box>
      <Flex justifyContent="end" margin="32px 0">
        <Button colorPalette="red" variant="ghost" onClick={onRemoveScripts}>
          <FaRegTrashAlt /> Remove all
        </Button>
        <Button
          colorPalette="green"
          variant="solid"
          onClick={onDownloadAllFiles}
        >
          <LuHardDriveDownload /> Download all
        </Button>
      </Flex>
    </>
  ) : (
    <Text margin="72px 0" textAlign="center">
      No scripts added. Start by selecting some scripts.
    </Text>
  );

  const pageContent = isLoading ? <Loader /> : tableContent;

  return (
    <Container maxWidth="900px">
      <Box mt="32px" mb="32px">
        <FileDropzone onAddFiles={onAddScripts} />
      </Box>

      {pageContent}
    </Container>
  );
}

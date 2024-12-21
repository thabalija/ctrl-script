"use client";

import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuHardDriveDownload } from "react-icons/lu";
import { db, FileItem } from "../../../db";
import { Loader } from "../../core/loader/Loader";
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

  function onRemoveFiles() {
    db.files.clear();
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

  const isLoading = files === undefined;

  const tableContent =
    !isLoading && files.length ? (
      <>
        <Box margin="32px 0">
          <Heading as="h1" marginBottom="24px">
            Files
          </Heading>
          <FileTable files={files} onDeleteFileItem={onDeleteFile} />
        </Box>
        <Flex justifyContent="end" margin="32px 0" gap="4">
          <Button colorPalette="red" variant="ghost" onClick={onRemoveFiles}>
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
        No files added. Start by selecting some files.
      </Text>
    );

  const pageContent = isLoading ? <Loader /> : tableContent;

  return (
    <Container maxWidth="900px">
      <Box margin="32px 0">
        <FileDropzone onAddFiles={onAddFiles} />
      </Box>

      {pageContent}
    </Container>
  );
}

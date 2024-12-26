"use client";

import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
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
  const [selectedFileItemIds, setSelectedFileItemIds] = useState<number[]>([]);

  function onDeleteFile(fileItem: FileItem) {
    if (selectedFileItemIds.includes(fileItem.id)) {
      const newSelectedFileItemIds = selectedFileItemIds.filter(
        (id) => id !== fileItem.id,
      );
      setSelectedFileItemIds(newSelectedFileItemIds);
    }

    db.files.delete(fileItem.id);
  }

  async function onRemoveFiles() {
    if (!selectedFileItemIds.length) {
      db.files.clear();
    } else {
      await db.files.bulkDelete(selectedFileItemIds);
    }
    setSelectedFileItemIds([]);
  }

  async function onAddFiles(fileList: FileList | null) {
    await importFiles(fileList, db.files);
  }

  async function onDownloadFiles() {
    if (!files?.length) {
      return;
    }

    const filesToDownload = selectedFileItemIds.length
      ? files.filter((file) => selectedFileItemIds.includes(file.id))
      : files;

    const compressedFile = await compressFiles(filesToDownload);
    downloadFile(compressedFile, "files.zip");
  }

  function onEditFileItem(id: number) {
    redirect(`/editor?fileId=${id}`);
  }

  function onSelectFileItems(ids: Array<number>) {
    setSelectedFileItemIds(ids);
  }

  const isLoading = files === undefined;

  const tableContent =
    !isLoading && files.length ? (
      <>
        <Box margin="32px 0">
          <Heading as="h1" marginBottom="24px">
            Files ({files.length})
          </Heading>
          <FileTable
            selectedFileIds={selectedFileItemIds}
            files={files}
            onDeleteFileItem={onDeleteFile}
            onEditFileItem={onEditFileItem}
            onSelectFileItems={onSelectFileItems}
          />
        </Box>
        <Flex justifyContent="end" margin="32px 0" gap="4">
          <Button colorPalette="red" variant="ghost" onClick={onRemoveFiles}>
            <FaRegTrashAlt /> Remove{" "}
            {selectedFileItemIds.length &&
            selectedFileItemIds.length !== files.length
              ? "selected"
              : "all"}
          </Button>
          <Button
            colorPalette="green"
            variant="solid"
            onClick={onDownloadFiles}
          >
            <LuHardDriveDownload /> Download{" "}
            {selectedFileItemIds.length &&
            selectedFileItemIds.length !== files.length
              ? "selected"
              : "all"}
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
    <Container maxWidth="1000px">
      <Box margin="32px 0">
        <FileDropzone onAddFiles={onAddFiles} />
      </Box>

      {pageContent}
    </Container>
  );
}

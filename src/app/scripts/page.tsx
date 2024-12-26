"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuHardDriveDownload } from "react-icons/lu";
import { db, FileItem } from "../../../db";
import { Toaster, toaster } from "../../components/ui/toaster";
import { Loader } from "../../core/Loader/Loader";
import { FileTable } from "../../features/file-table/FileTable/FileTable";
import { FileDropzone } from "../../features/file-upload/FileDropzone/FileDropzone";
import { compressFiles } from "../../helpers/compress-files";
import { downloadFile } from "../../helpers/download-file";
import { importFiles } from "../../helpers/import-files";

export default function Scripts() {
  const scripts = useLiveQuery(() => db.scripts.toArray());
  const [selectedFileItemIds, setSelectedFileItemIds] = useState<number[]>([]);

  async function onDeleteScript(fileItem: FileItem) {
    if (selectedFileItemIds.includes(fileItem.id)) {
      const newSelectedFileItemIds = selectedFileItemIds.filter(
        (id) => id !== fileItem.id,
      );
      setSelectedFileItemIds(newSelectedFileItemIds);
    }

    await db.scripts.delete(fileItem.id);

    toaster.create({
      title: `Script removed successfully.`,
      type: "success",
    });
  }

  async function onAddScripts(fileList: FileList | null) {
    if (fileList?.length) {
      await importFiles(fileList, db.scripts);

      toaster.create({
        title: `Scripts added successfully.`,
        type: "success",
      });
    }
  }

  async function onRemoveScripts() {
    if (!selectedFileItemIds.length) {
      await db.scripts.clear();
    } else {
      await db.scripts.bulkDelete(selectedFileItemIds);
    }

    setSelectedFileItemIds([]);

    toaster.create({
      title: `Scripts removed successfully.`,
      type: "success",
    });
  }

  async function onDownloadScripts() {
    if (!scripts?.length) {
      return;
    }

    const scriptsToDownload = selectedFileItemIds.length
      ? scripts.filter((file) => selectedFileItemIds.includes(file.id))
      : scripts;

    const compressedFile = await compressFiles(scriptsToDownload);
    downloadFile(compressedFile, "files.zip");
  }

  function onEditFileItem(id: number) {
    redirect(`/editor?scriptId=${id}`);
  }

  function onSelectFileItems(ids: Array<number>) {
    setSelectedFileItemIds(ids);
  }

  const isLoading = scripts === undefined;

  const tableContent =
    !isLoading && scripts.length ? (
      <>
        <Box margin="32px 0">
          <Heading as="h1" marginBottom="24px">
            Scripts ({scripts.length})
          </Heading>
          <FileTable
            selectedFileIds={selectedFileItemIds}
            files={scripts}
            onDeleteFileItem={onDeleteScript}
            onEditFileItem={onEditFileItem}
            onSelectFileItems={onSelectFileItems}
          />
        </Box>
        <Flex justifyContent="end" margin="32px 0" gap="4">
          <Button colorPalette="red" variant="ghost" onClick={onRemoveScripts}>
            <FaRegTrashAlt /> Remove{" "}
            {selectedFileItemIds.length &&
            selectedFileItemIds.length !== scripts.length
              ? "selected"
              : "all"}
          </Button>
          <Button
            colorPalette="green"
            variant="solid"
            onClick={onDownloadScripts}
          >
            <LuHardDriveDownload /> Download{" "}
            {selectedFileItemIds.length &&
            selectedFileItemIds.length !== scripts.length
              ? "selected"
              : "all"}
          </Button>
        </Flex>
      </>
    ) : (
      <Text margin="72px 0" textAlign="center">
        No scripts added. Start by importing some scripts or writing one in the{" "}
        <Link href="/editor" colorPalette="purple" fontWeight="bold">
          editor
        </Link>
        .
      </Text>
    );

  const pageContent = isLoading ? <Loader /> : tableContent;

  return (
    <Container maxWidth="1000px">
      {pageContent}

      <Box mt="32px" mb="32px">
        <FileDropzone onAddFiles={onAddScripts} />
      </Box>

      <Toaster />
    </Container>
  );
}

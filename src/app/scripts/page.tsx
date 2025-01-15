"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Link,
  Show,
  Text,
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuHardDriveDownload } from "react-icons/lu";
import { db, FileItem } from "../../../db";
import { Toaster, toaster } from "../../components/ui/toaster";
import { ConfirmAction } from "../_components/ConfirmAction/ConfirmAction";
import { FileDropzone } from "../_components/FileDropzone/FileDropzone";
import { FileTable } from "../_components/FileTable/FileTable";
import { Loader } from "../_components/Loader/Loader";
import { EDITOR_ROUTE_PARAM } from "../_constants/editorRouteParam";
import { ROUTE } from "../_constants/route";
import { compressFiles } from "../_utils/compressFiles";
import { downloadFile } from "../_utils/downloadFile";
import { importFiles } from "../_utils/importFiles";

export default function Scripts() {
  const scripts = useLiveQuery(() => db.scripts.toArray());
  const [selectedFileItemIds, setSelectedFileItemIds] = useState<number[]>([]);
  const isLoadingFiles = scripts === undefined;
  const [isImportingScripts, setIsImportingScripts] = useState(false);
  const isLoading = isLoadingFiles || isImportingScripts;

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

  function onAddScripts(fileList: FileList | null) {
    setIsImportingScripts(true);

    importFiles(fileList, db.scripts, () => {
      setIsImportingScripts(false);
      toaster.create({
        title: `Scripts added successfully.`,
        type: "success",
      });
    });
  }

  async function onDeleteMultipleScripts() {
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

  return (
    <Container>
      <Show when={isLoading}>
        <Loader />
      </Show>

      <Show when={!isLoading && !scripts.length}>
        <Text margin="72px 0" textAlign="center">
          No scripts added. Start by importing some scripts or writing one in
          the{" "}
          <Link
            as={NextLink}
            href={ROUTE.EDITOR}
            colorPalette="purple"
            fontWeight="bold"
          >
            editor
          </Link>
          .
        </Text>
      </Show>

      {!isLoading && scripts.length ? (
        <>
          <Box margin="32px 0">
            <Heading as="h1" marginBottom="24px">
              Scripts ({scripts.length})
            </Heading>
            <FileTable
              selectedFileIds={selectedFileItemIds}
              files={scripts}
              onDeleteFileItem={onDeleteScript}
              onEditFileItem={(id) =>
                redirect(
                  `${ROUTE.EDITOR}/?${EDITOR_ROUTE_PARAM.SCRIPT_ID}=${id}`,
                )
              }
              onSelectFileItems={setSelectedFileItemIds}
            />
          </Box>
          <HStack justifyContent="end" margin="32px 0" gap="4">
            <ConfirmAction
              title="Delete scripts"
              description="Are you sure you want to remove these scripts?"
              onConfirm={() => onDeleteMultipleScripts()}
            >
              {({ openDialog }) => (
                <Button colorPalette="red" variant="ghost" onClick={openDialog}>
                  <FaRegTrashAlt /> Remove{" "}
                  {selectedFileItemIds.length &&
                  selectedFileItemIds.length !== scripts.length
                    ? "selected"
                    : "all"}
                </Button>
              )}
            </ConfirmAction>

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
          </HStack>
        </>
      ) : null}

      <Box mt="32px" mb="32px">
        <FileDropzone onAddFiles={onAddScripts} />
      </Box>

      <Toaster />
    </Container>
  );
}

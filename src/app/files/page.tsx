"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Show,
  Text,
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuHardDriveDownload, LuListStart } from "react-icons/lu";
import { db, FileItem } from "../../../db";
import { toaster } from "../../components/ui/toaster";
import { ConfirmAction } from "../_components/ConfirmAction/ConfirmAction";
import { Dropdown, IDropdownOption } from "../_components/Dropdown/Dropdown";
import { FileDropzone } from "../_components/FileDropzone/FileDropzone";
import { FileTable } from "../_components/FileTable/FileTable";
import { Loader } from "../_components/Loader/Loader";
import { EDITOR_ROUTE_PARAM } from "../_constants/editorRouteParam";
import { ROUTE } from "../_constants/route";
import { compressFiles } from "../_utils/compressFiles";
import { downloadFile } from "../_utils/downloadFile";
import { importFilesWithWebWorker } from "../_utils/importFilesWithWebWorker";
import { applyScriptToMultipleFiles } from "./_utils/applyScriptToMultipleFiles";

export default function FilesContainer() {
  const files = useLiveQuery(() => db.files.toArray());
  const scripts = useLiveQuery(() => db.scripts.toArray());
  const isLoadingFiles = files === undefined;
  const [isImportingFiles, setIsImportingFiles] = useState(false);
  const isLoading = isLoadingFiles || isImportingFiles;
  const [selectedScript, setSelectedScript] = useState<FileItem>();
  const [selectedFileItemIds, setSelectedFileItemIds] = useState<number[]>([]);
  const [scriptOptions, setScriptOptions] = useState<
    Array<IDropdownOption<FileItem>>
  >([]);

  useEffect(() => {
    if (!scripts) return;

    const options: Array<IDropdownOption<FileItem>> = scripts.map((script) => ({
      label: script.name,
      value: script,
    }));

    setScriptOptions(options);
  }, [scripts]);

  async function onDeleteFile(fileItem: FileItem) {
    if (selectedFileItemIds.includes(fileItem.id)) {
      const newSelectedFileItemIds = selectedFileItemIds.filter(
        (id) => id !== fileItem.id,
      );
      setSelectedFileItemIds(newSelectedFileItemIds);
    }

    await db.files.delete(fileItem.id);

    toaster.create({
      title: `File removed successfully.`,
      type: "success",
    });
  }

  async function onDeleteMultipleFiles() {
    if (!selectedFileItemIds.length) {
      await db.files.clear();
    } else {
      await db.files.bulkDelete(selectedFileItemIds);
    }
    setSelectedFileItemIds([]);

    toaster.create({
      title: `Files removed successfully.`,
      type: "success",
    });
  }

  function onAddFiles(fileList: FileList | null) {
    setIsImportingFiles(true);

    importFilesWithWebWorker(fileList, db.files, () => {
      setIsImportingFiles(false);
      toaster.create({
        title: `Files added successfully.`,
        type: "success",
      });
    });
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

  async function onApplyScript() {
    if (!selectedScript || !files) return;

    const script = await selectedScript.file.text();

    const fileItemsToModify = selectedFileItemIds.length
      ? files.filter((file) => selectedFileItemIds.includes(file.id))
      : files;

    try {
      await applyScriptToMultipleFiles(fileItemsToModify, script);

      toaster.create({
        title: `Script applied successfully.`,
        type: "success",
      });
    } catch (error) {
      toaster.create({ title: `${error}`, type: "error" });
    }
  }

  return (
    <Container>
      <Show when={isLoading}>
        <Loader />
      </Show>

      <Show when={!isLoading && !files.length}>
        <Text margin="72px 0" textAlign="center">
          No files added. Start by selecting text files, or a zip containing
          text files.
        </Text>
      </Show>

      {!isLoading && files.length ? (
        <>
          <Box marginBottom="4">
            <Heading as="h1" fontSize="3xl" marginBottom="8">
              Files ({files.length})
            </Heading>
            <FileTable
              selectedFileIds={selectedFileItemIds}
              files={files}
              onDeleteFileItem={onDeleteFile}
              onEditFileItem={(id) =>
                redirect(`${ROUTE.EDITOR}/?${EDITOR_ROUTE_PARAM.FILE_ID}=${id}`)
              }
              onSelectFileItems={setSelectedFileItemIds}
            />
          </Box>
          <HStack
            flexWrap="wrap"
            justifyContent="space-between"
            margin="32px 0"
            gap="4"
          >
            <HStack gap="4">
              <Box maxWidth={"200px"}>
                <Dropdown
                  compareValues={(a, b) => a.id === b.id}
                  emptyLabel="No scripts added"
                  multiple={false}
                  options={scriptOptions}
                  placeholder="Select script"
                  selectedValues={selectedScript ? [selectedScript] : []}
                  onValueChange={(selected) => setSelectedScript(selected[0])}
                />
              </Box>

              <Button
                colorPalette="purple"
                variant="ghost"
                disabled={!selectedScript}
                onClick={onApplyScript}
              >
                <LuListStart /> Apply script to{" "}
                {selectedFileItemIds.length &&
                selectedFileItemIds.length !== files.length
                  ? "selected"
                  : "all"}
              </Button>
            </HStack>
            <HStack gap="4">
              <ConfirmAction
                title="Delete files"
                description="Are you sure you want to remove these files?"
                onConfirm={() => onDeleteMultipleFiles()}
              >
                {({ openDialog }) => (
                  <Button
                    colorPalette="red"
                    variant="ghost"
                    onClick={openDialog}
                  >
                    <FaRegTrashAlt /> Remove{" "}
                    {selectedFileItemIds.length &&
                    selectedFileItemIds.length !== files.length
                      ? "selected"
                      : "all"}
                  </Button>
                )}
              </ConfirmAction>

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
            </HStack>
          </HStack>
        </>
      ) : null}

      <Box margin="32px 0">
        <FileDropzone onAddFiles={onAddFiles} />
      </Box>
    </Container>
  );
}

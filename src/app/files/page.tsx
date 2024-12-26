"use client";

import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuHardDriveDownload, LuListStart } from "react-icons/lu";
import { db, FileItem } from "../../../db";
import { Toaster, toaster } from "../../components/ui/toaster";
import { Loader } from "../../core/MainLoader/Loader";
import { Dropdown, IDropdownOption } from "../../core/select/dropdown";
import { FileTable } from "../../features/file-table/FileTable/FileTable";
import { FileDropzone } from "../../features/file-upload/FileDropzone/FileDropzone";
import { compressFiles } from "../../helpers/compress-files";
import { downloadFile } from "../../helpers/download-file";
import { importFiles } from "../../helpers/import-files";

export default function FilesContainer() {
  const files = useLiveQuery(() => db.files.toArray());
  const scripts = useLiveQuery(() => db.scripts.toArray());
  const [selectedScript, setSelectedScript] = useState<FileItem>();

  const [selectedFileItemIds, setSelectedFileItemIds] = useState<number[]>([]);

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

  async function onRemoveFiles() {
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

  async function onAddFiles(fileList: FileList | null) {
    await importFiles(fileList, db.files);

    toaster.create({
      title: `Files added successfully.`,
      type: "success",
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

  function onEditFileItem(id: number) {
    redirect(`/editor?fileId=${id}`);
  }

  function onSelectFileItems(ids: Array<number>) {
    setSelectedFileItemIds(ids);
  }

  async function onApplyScript() {
    if (!selectedScript || !files) return;

    const script = await selectedScript.file.text();

    const fileItemsToModify = selectedFileItemIds.length
      ? files.filter((file) => selectedFileItemIds.includes(file.id))
      : files;

    for (const fileItem of fileItemsToModify) {
      const func = new Function(script);
      const fileText = await fileItem.file.text();
      const result = func.call(null, fileText);
      const newFile = new File([result], fileItem.name, {
        type: fileItem.file.type,
      });

      fileItem.file = newFile;

      await db.files.put(fileItem);
    }

    toaster.create({
      title: `Script applied successfully.`,
      type: "success",
    });
  }

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
        <Flex justifyContent="space-between" margin="32px 0">
          <Flex gap="4">
            <Dropdown
              compareValues={(a, b) => a.id === b.id}
              onValueChange={(selected) => setSelectedScript(selected[0])}
              options={scriptOptions}
              placeholder="Select script"
              selectedValues={selectedScript ? [selectedScript] : []}
              multiple={false}
              disabled={!scripts?.length}
            />

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
          </Flex>
          <Flex gap="4">
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
        </Flex>
      </>
    ) : (
      <Text margin="72px 0" textAlign="center">
        No files added. Start by selecting text files, or a zip containing text
        files.
      </Text>
    );

  const pageContent = isLoading ? <Loader /> : tableContent;

  return (
    <Container maxWidth="1000px">
      {pageContent}

      <Box margin="32px 0">
        <FileDropzone onAddFiles={onAddFiles} />
      </Box>

      <Toaster />
    </Container>
  );
}

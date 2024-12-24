"use client";

import { Button, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { db, FileItem } from "../../../../db";
import { downloadFile } from "../../../helpers/download-file";
import { FileMetaForm } from "../../file-meta-form/FileMetaForm/FileMetaForm";

interface ISingleFileActionsProps {
  fileItem?: FileItem;
  newFileContent: string;
  onFileSaved: (fileItem: FileItem) => unknown;
  onFileCreated: (fileItem: FileItem) => unknown;
}

export function SingleFileActions({
  fileItem,
  newFileContent,
  onFileCreated,
  onFileSaved,
}: ISingleFileActionsProps) {
  const [fileName, setFileName] = useState(fileItem?.name || "");
  const [extension, setExtension] = useState(fileItem?.extension || "");

  useEffect(() => {
    setFileName(fileItem?.name || "");
    setExtension(fileItem?.extension || "");
  }, [fileItem, newFileContent]);

  async function onSave() {
    if (!fileItem) {
      return;
    }

    fileItem.name = fileName;
    fileItem.extension = extension;
    const newFile = new File([newFileContent], fileName, {
      type: fileItem.file.type,
    });
    fileItem.file = newFile;

    await db.files.put(fileItem);

    onFileSaved(fileItem);
  }

  async function onCreateNewFile() {
    if (!fileItem) {
      return;
    }

    const newFile = new File([newFileContent], fileName, {
      type: fileItem.file.type,
    });

    const newFileItem = {
      extension,
      name: fileName,
      file: newFile,
    };

    const newFileItemIndex = await db.files.add(newFileItem);
    const newFileItemFromDb = await db.files.get(newFileItemIndex);

    if (newFileItemFromDb) {
      onFileCreated(newFileItemFromDb);
    }
  }

  async function onDownload() {
    if (!fileItem) {
      return;
    }

    const newFile = new File([newFileContent], fileName, {
      type: fileItem.file.type,
    });

    downloadFile(newFile, `${fileName}.${fileItem.extension}`);
  }

  return (
    <HStack marginBottom="6" alignItems="end" gap={4}>
      <FileMetaForm
        name={fileName}
        extension={extension}
        onNameChange={setFileName}
        onExtensionChange={setExtension}
      />

      <Button
        colorPalette="purple"
        disabled={!fileItem}
        variant="solid"
        onClick={onSave}
      >
        <FaRegSave />
        Save changes
      </Button>
      <Button
        colorPalette="purple"
        disabled={!fileItem}
        variant="ghost"
        onClick={onCreateNewFile}
      >
        <MdOutlineAddCircleOutline />
        Save as new file
      </Button>

      <Button
        colorPalette="purple"
        disabled={!fileItem}
        variant="ghost"
        onClick={onDownload}
      >
        <FiDownload />
        Download result
      </Button>
    </HStack>
  );
}

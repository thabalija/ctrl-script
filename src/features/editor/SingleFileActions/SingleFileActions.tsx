"use client";

import { Button, HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { db, FileItem } from "../../../../db";
import { Field } from "../../../components/ui/field";
import { downloadFile } from "../../../helpers/download-file";

interface ISingleFileActionsProps {
  fileItem?: FileItem;
  newFileContent: string;
  onFileSaved: (fileItem: FileItem) => unknown;
}

export function SingleFileActions({
  fileItem,
  newFileContent,
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
      <Field label="File name" maxWidth={300}>
        <Input
          disabled={!fileItem}
          placeholder="Enter file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </Field>
      <Field label="Extension" maxWidth={300}>
        <Input
          disabled={!fileItem}
          placeholder="Enter extension"
          value={extension}
          onChange={(e) => setExtension(e.target.value)}
        />
      </Field>
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
        onClick={onDownload}
      >
        <FiDownload />
        Download modified
      </Button>
    </HStack>
  );
}

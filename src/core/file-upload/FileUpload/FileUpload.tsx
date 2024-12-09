"use client";

import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "@/components/ui/file-upload";
import { Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { db } from "../../../../db";

export function FileUpload() {
  const [files, setFiles] = useState<FileList | null>();

  async function addFiles() {
    if (!files?.length) {
      return;
    }

    const firstFile = files[0];

    await db.fileItems.add({
      name: firstFile.name,
      extension: firstFile.name.split(".").pop() as string,
      file: firstFile,
    });
  }

  return (
    <>
      <FileUploadRoot
        maxW="xl"
        alignItems="stretch"
        maxFiles={10}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFiles(e.target.files)
        }
      >
        <FileUploadDropzone
          label="Drag and drop files here"
          description="Select any text file"
        />
        <FileUploadList />
      </FileUploadRoot>
      <Button onClick={addFiles} type="button">
        Add files
      </Button>
    </>
  );
}

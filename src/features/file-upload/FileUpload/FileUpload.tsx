"use client";

import {
  FileUploadDropzone,
  FileUploadRoot,
} from "@/components/ui/file-upload";
import { ChangeEvent } from "react";

interface IFileUploadProps {
  onAddFiles: (fileList: FileList | null) => void;
}

export function FileUpload({ onAddFiles }: IFileUploadProps) {
  return (
    <>
      <FileUploadRoot
        maxW="xl"
        maxFiles={10000}
        alignItems="stretch"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onAddFiles(e.target.files)
        }
      >
        <FileUploadDropzone
          label="Drag and drop files here"
          description="Select any text file"
        />
      </FileUploadRoot>
    </>
  );
}

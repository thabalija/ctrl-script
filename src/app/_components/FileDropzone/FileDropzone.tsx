"use client";

import {
  FileUploadDropzone,
  FileUploadRoot,
} from "@/components/ui/file-upload";
import { ChangeEvent } from "react";

interface IFileUploadDropzoneProps {
  onAddFiles: (fileList: FileList | null) => void;
}

export function FileDropzone({ onAddFiles }: IFileUploadDropzoneProps) {
  return (
    <FileUploadRoot
      maxFiles={10000}
      alignItems="stretch"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onAddFiles(e.target.files)
      }
    >
      <FileUploadDropzone
        label="Drag and drop files here"
        description="Select any text file"
        onDrop={(e) => onAddFiles(e.dataTransfer.files)}
      />
    </FileUploadRoot>
  );
}

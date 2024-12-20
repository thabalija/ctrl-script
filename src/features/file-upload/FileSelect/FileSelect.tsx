"use client";

import { FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-upload";
import { Button } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { HiUpload } from "react-icons/hi";

interface IFileUploadDropzoneProps {
  onAddFiles: (fileList: FileList | null) => void;
}

export function FileSelect({ onAddFiles }: IFileUploadDropzoneProps) {
  return (
    <FileUploadRoot
      maxFiles={10000}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onAddFiles(e.target.files)
      }
    >
      <FileUploadTrigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUploadTrigger>
    </FileUploadRoot>
  );
}

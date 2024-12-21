"use client";

import { FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-upload";
import { Button, Container, Text } from "@chakra-ui/react";
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
        <Button
          variant="outline"
          rounded="full"
          padding={"12px"}
          height={"auto"}
        >
          <Text fontSize="18px" color={"gray.500"}>
            Start by selecting files...
          </Text>
          <Container
            borderRadius={"50px"}
            background={"purple.500"}
            padding={2}
          >
            <HiUpload color="white" height="48px" width="48px" />
          </Container>
        </Button>
      </FileUploadTrigger>
    </FileUploadRoot>
  );
}

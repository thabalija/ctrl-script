"use client";

import { FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-upload";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { LuUpload } from "react-icons/lu";

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
          padding={"8px 8px 8px 24px"}
          height={"auto"}
          width="100%"
        >
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Text fontSize="16px" color="gray.500" flex="1" textAlign="left">
              Start by selecting files...
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              borderRadius={"50px"}
              background={"purple.500"}
              padding={2}
              width="48px"
              height="48px"
            >
              <Icon fontSize="24px" color="white">
                <LuUpload />
              </Icon>
            </Flex>
          </Flex>
        </Button>
      </FileUploadTrigger>
    </FileUploadRoot>
  );
}

"use client";

import { Container, Heading, Text } from "@chakra-ui/react";
import { FileUpload } from "../../file-upload/FileUpload/FileUpload";
import { db } from "../../../../db";

export default function HomeHero() {
  async function onAddFiles(fileList: FileList | null) {
    if (!fileList?.length) {
      return;
    }

    Array.from(fileList).forEach(async (file) => {
      await db.files.add({
        name: file.name,
        extension: file.name.split(".").pop() || "",
        file: file,
        versions: [file],
      });
    });
  }

  return (
    <Container maxWidth="600px" textAlign="center" padding="100px 24px">
      <Heading as="h1" mb="32px" fontSize="3xl">
        Edit, Apply, and Conquer. Bulk File Scripting Made Simple.
      </Heading>
      <Text as="p" mb="32px">
        Transform how you manage your files with CodeFusion, the tool for bulk
        file modifications and data extraction. Write powerful scripts, and
        apply them across multiple files.
      </Text>
      <FileUpload onAddFiles={onAddFiles} />
    </Container>
  );
}

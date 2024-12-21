"use client";

import { Container, Heading, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { db } from "../../../../db";
import { FileSelect } from "../../../features/file-upload/FileSelect/FileSelect";
import { importFiles } from "../../../helpers/import-files";

export default function HomeHero() {
  async function onAddFiles(fileList: FileList | null) {
    await importFiles(fileList, db.files);
    redirect("/files");
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
      <FileSelect onAddFiles={onAddFiles} />
    </Container>
  );
}

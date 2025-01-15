"use client";

import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { db } from "../../../../../db";
import { FileSelect } from "../../../_components/FileSelect/FileSelect";
import { ROUTE } from "../../../_constants/route";
import { importFiles } from "../../../_utils/importFiles";

export default function HomeHero() {
  function onAddFiles(fileList: FileList | null) {
    importFiles(fileList, db.files, () => redirect(ROUTE.FILES));
  }

  return (
    <Container maxWidth="600px" textAlign="center" padding="24px">
      <Heading as="h1" mb="32px" fontSize="3xl" fontWeight="bold">
        Edit, Apply, and Conquer. Bulk File Scripting Made Simple.
      </Heading>
      <Text as="p" mb="32px">
        Transform how you manage your files with CTRL Script, the tool for bulk
        file modifications and data extraction. Write powerful scripts, and
        apply them across multiple files.
      </Text>
      <Flex justifyContent="center" width="100%">
        <Flex justifyContent="stretch" width="500px" maxWidth="100%">
          <FileSelect onAddFiles={onAddFiles} />
        </Flex>
      </Flex>
    </Container>
  );
}

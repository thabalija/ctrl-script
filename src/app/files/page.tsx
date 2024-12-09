"use client";

import { Container } from "@chakra-ui/react";
import { FileUpload } from "../../core/file-upload/FileUpload/FileUpload";
import { FileList } from "../../features/file-list/FileList/FileList";

export default function Files() {
  return (
    <Container>
      <FileUpload />
      <FileList />
    </Container>
  );
}

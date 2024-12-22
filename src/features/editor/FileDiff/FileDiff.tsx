"use client";

import { Box, Container } from "@chakra-ui/react";
import { DiffEditor } from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface IFileDiffProps {
  original: string;
  modified: string;
  language: string;
}

export function FileDiff({ original, modified, language }: IFileDiffProps) {
  const { theme } = useTheme();

  return (
    <Container padding="0">
      <Box height="40vh" width="100%">
        <DiffEditor
          height="100%"
          language={language}
          modified={modified}
          original={original}
          theme={theme === "dark" ? "vs-dark" : "light"}
        />
      </Box>
    </Container>
  );
}

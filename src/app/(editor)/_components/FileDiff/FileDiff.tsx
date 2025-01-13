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
      <Box
        border="1px solid var(--chakra-colors-border)"
        borderRadius="lg"
        height="300px"
        minHeight="100px"
        maxHeight="80vh"
        width="100%"
        minWidth="100px"
        maxWidth="100%"
        overflow="auto"
        resize="both"
      >
        <DiffEditor
          language={language}
          modified={modified}
          original={original}
          theme={theme === "dark" ? "vs-dark" : "light"}
          options={{ readOnly: true }}
        />
      </Box>
    </Container>
  );
}

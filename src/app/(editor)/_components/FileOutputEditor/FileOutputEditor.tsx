"use client";

import { Box, Container } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

export interface IFileOutputEditorProps {
  output: string;
  extension: string;
  onChange: (value: string) => void;
}

export function FileOutputEditor({
  output,
  extension,
  onChange,
}: IFileOutputEditorProps) {
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
        <Editor
          value={output}
          language={extension}
          theme={theme === "dark" ? "vs-dark" : "light"}
          onChange={(value) => onChange(value || "")}
        />
      </Box>
    </Container>
  );
}

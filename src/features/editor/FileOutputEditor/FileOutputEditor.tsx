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
        max-height="80vh"
        overflow="hidden"
        width="100%"
      >
        <Editor
          height="100%"
          value={output}
          language={extension}
          theme={theme === "dark" ? "vs-dark" : "light"}
          onChange={(value) => onChange(value || "")}
        />
      </Box>
    </Container>
  );
}

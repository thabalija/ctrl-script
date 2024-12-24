"use client";

import { Box, Container } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

export interface ICodeEditorProps {
  script: string;
  handleScriptChange: (value: string) => void;
}

export function CodeEditor({ script, handleScriptChange }: ICodeEditorProps) {
  const { theme } = useTheme();

  return (
    <Container padding="0">
      <Box height="40vh" width="100%">
        <Editor
          height="100%"
          value={script}
          language="javascript"
          theme={theme === "dark" ? "vs-dark" : "light"}
          onChange={(value) => handleScriptChange(value || "")}
        />
      </Box>
    </Container>
  );
}

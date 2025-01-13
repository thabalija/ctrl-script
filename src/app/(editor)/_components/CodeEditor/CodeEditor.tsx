"use client";

import { Box } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

export interface ICodeEditorProps {
  script: string;
  onScriptChange: (value: string) => void;
}

export function CodeEditor({ script, onScriptChange }: ICodeEditorProps) {
  const { theme } = useTheme();

  return (
    <Box
      border="1px solid var(--chakra-colors-border)"
      borderRadius="lg"
      height="400px"
      minHeight="100px"
      maxHeight="80vh"
      width="100%"
      minWidth="100px"
      maxWidth="100%"
      overflow="auto"
      resize="both"
    >
      <Editor
        value={script}
        language="javascript"
        theme={theme === "dark" ? "vs-dark" : "light"}
        onChange={(value) => onScriptChange(value || "")}
      />
    </Box>
  );
}

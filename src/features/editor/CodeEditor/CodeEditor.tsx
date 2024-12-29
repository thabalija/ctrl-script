"use client";

import { Box } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

export interface ICodeEditorProps {
  script: string;
  handleScriptChange: (value: string) => void;
}

export function CodeEditor({ script, handleScriptChange }: ICodeEditorProps) {
  const { theme } = useTheme();

  return (
    <Box
      border="1px solid var(--chakra-colors-border)"
      borderRadius="lg"
      height="400px"
      max-height="80vh"
      overflow="hidden"
      width="100%"
    >
      <Editor
        height="100%"
        value={script}
        language="javascript"
        theme={theme === "dark" ? "vs-dark" : "light"}
        onChange={(value) => handleScriptChange(value || "")}
      />
    </Box>
  );
}

"use client";

import { Container } from "@chakra-ui/react";
import Editor, { Theme } from "@monaco-editor/react";

export interface ICodeEditorProps {
  script?: string;
  language: string;
  theme: Theme;
  handleScriptChange: (value: string | undefined) => void;
}

export function CodeEditor({
  script,
  language,
  theme,
  handleScriptChange,
}: ICodeEditorProps) {
  return (
    <Container padding={0} minW="400px">
      <Editor
        height="40vh"
        width="70%"
        value={script}
        language={language}
        theme={theme}
        onChange={(value) => handleScriptChange(value)}
      />
    </Container>
  );
}

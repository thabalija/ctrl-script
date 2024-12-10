"use client";

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
    <>
      <Editor
        height="35vh"
        defaultValue={script}
        language={language}
        theme={theme}
        onChange={(value) => handleScriptChange(value)}
      />
    </>
  );
}

"use client";

import { DiffEditor, MonacoDiffEditor, Theme } from "@monaco-editor/react";
import { useRef } from "react";

interface IFileDiffProps {
  original: string;
  modified: string;
  theme: Theme;
  language: string;
}

export function FileDiff({
  original,
  modified,
  theme,
  language,
}: IFileDiffProps) {
  const diffEditorRef = useRef<MonacoDiffEditor>();

  function handleDiffEditorDidMount(editor: MonacoDiffEditor) {
    diffEditorRef.current = editor;
  }

  return (
    <DiffEditor
      height="35vh"
      language={language}
      theme={theme}
      modified={modified}
      original={original}
      onMount={handleDiffEditorDidMount}
    />
  );
}

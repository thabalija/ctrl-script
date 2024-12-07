"use client";

import Link from "next/link";
import CodeEditor from "../../features/editor/CodeEditor/CodeEditor";
import FileDiff from "../../features/editor/FileDiff/FileDiff";
import { useState } from "react";
import { Theme } from "@monaco-editor/react";

export default function Home() {
  const defaultScript =
    "return arguments[0].split(',').map((fruit, i) => fruit + i).join(',');";
  const original = "banana, apple, orange";
  const language = "javascript";
  const theme: Theme = "vs-dark";
  const [script, setScript] = useState<string | undefined>(defaultScript);
  const [modified, setModified] = useState(original);

  function executeValue() {
    if (script === undefined) return;

    const func = new Function(script);
    const result = func.call(null, original);

    setModified(result);
  }

  function handleScriptChange(script: string | undefined) {
    setScript(script);
  }

  return (
    <>
      <button onClick={executeValue}>Execute value</button>
      <Link href="/">Home</Link>
      <CodeEditor
        script={script}
        language={language}
        theme={theme}
        handleScriptChange={handleScriptChange}
      />
      <br />
      <FileDiff
        original={original}
        modified={modified}
        theme={theme}
        language={language}
      />
    </>
  );
}

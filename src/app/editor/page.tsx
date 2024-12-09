"use client";

import { Theme } from "@monaco-editor/react";
import { useState } from "react";
import { CodeEditor } from "../../features/editor/CodeEditor/CodeEditor";
import { FileDiff } from "../../features/editor/FileDiff/FileDiff";
import { Navigation } from "../../features/navigation/Navigation/Navigation";

export default function Editor() {
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
      <Navigation />
      <CodeEditor
        script={script}
        language={language}
        theme={theme}
        handleScriptChange={handleScriptChange}
      />
      <button onClick={executeValue}>Execute value</button>
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

const defaultScript = `// File is located in the first argument. Return the modified file.

const file = arguments[0];
return file.split(',').map((fruit, i) => fruit + i).join(',');
`;

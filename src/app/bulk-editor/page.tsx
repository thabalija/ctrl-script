"use client";

import { Button } from "@chakra-ui/react";
import { Theme } from "@monaco-editor/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { db } from "../../../db";
import { CodeEditor } from "../../features/editor/CodeEditor/CodeEditor";
import { FileDiff } from "../../features/editor/FileDiff/FileDiff";

export default function BulkEditor() {
  const { theme } = useTheme();

  const codeTheme: Theme = theme === "dark" ? "vs-dark" : "light";

  const fileList = useLiveQuery(() => db.files.toArray()) || [];

  const [original, setOriginal] = useState("");

  const language = "javascript";
  const [script, setScript] = useState<string | undefined>(defaultScript);
  const [modified, setModified] = useState(original);

  useEffect(() => {
    fileList[0]?.file.text().then((value) => {
      setOriginal(value);
      setModified(value);
    });
  });

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
      <CodeEditor
        script={script}
        language={language}
        theme={codeTheme}
        handleScriptChange={handleScriptChange}
      />
      <br />
      <Button mb="12px" onClick={executeValue}>
        Execute value
      </Button>
      <br />
      <FileDiff
        original={original}
        modified={modified}
        theme={codeTheme}
        language={language}
      />
    </>
  );
}

const defaultScript = `// File is located in the first argument. Return the modified file.

const file = arguments[0];
return file.split(',').map((fruit, i) => fruit + i).join(',');
`;

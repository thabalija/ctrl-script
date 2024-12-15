"use client";

import { Button } from "@chakra-ui/react";
import { Theme } from "@monaco-editor/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { db } from "../../../../db";
import { CodeEditor } from "../../editor/CodeEditor/CodeEditor";
import { FileDiff } from "../../editor/FileDiff/FileDiff";

export default function EditorContainer() {
  const { theme } = useTheme();
  const codeTheme: Theme = theme === "dark" ? "vs-dark" : "light";

  const files = useLiveQuery(() => db.files.toArray()) || [];
  const scripts = useLiveQuery(() => db.scripts.toArray()) || [];

  const language = "javascript";
  const [original, setOriginal] = useState("");

  const [script, setScript] = useState<string | undefined>(defaultScript);
  const [modified, setModified] = useState(original);

  useEffect(() => {
    scripts[0]?.file.text().then((value) => {
      setScript(value);
    });

    files[0]?.file.text().then((value) => {
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

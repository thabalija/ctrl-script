"use client";

import { Button, Container } from "@chakra-ui/react";
import { Theme } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { CodeEditor } from "../../features/editor/CodeEditor/CodeEditor";
import { FileDiff } from "../../features/editor/FileDiff/FileDiff";

export default function Editor() {
  const { theme } = useTheme();

  const codeTheme: Theme = theme === "dark" ? "vs-dark" : "light";

  const original = "banana, apple, orange";
  const language = "javascript";
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
    <Container>
      <CodeEditor
        script={script}
        language={language}
        theme={codeTheme}
        handleScriptChange={handleScriptChange}
      />
      <br />
      <Button onClick={executeValue}>Execute value</Button>
      <br />
      <br />
      <FileDiff
        original={original}
        modified={modified}
        theme={codeTheme}
        language={language}
      />
    </Container>
  );
}

const defaultScript = `// File is located in the first argument. Return the modified file.

const file = arguments[0];
return file.split(',').map((fruit, i) => fruit + i).join(',');
`;

"use client";

import { Button, Container } from "@chakra-ui/react";
import { Theme } from "@monaco-editor/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { db } from "../../../db";
import { Dropdown } from "../../core/select/dropdown";
import { CodeEditor } from "../../features/editor/CodeEditor/CodeEditor";
import { FileDiff } from "../../features/editor/FileDiff/FileDiff";

export default function Editor() {
  const { theme } = useTheme();
  const codeTheme: Theme = theme === "dark" ? "vs-dark" : "light";

  const files = useLiveQuery(() => db.files.toArray()) || [];
  const scripts = useLiveQuery(() => db.scripts.toArray()) || [];

  const language = "javascript";
  const [original, setOriginal] = useState("");

  const [script, setScript] = useState<string | undefined>(defaultScript);
  const [modified, setModified] = useState(original);

  const [isInit, setIsInit] = useState<boolean>(true);

  useEffect(() => {
    if (!isInit) return;
    setIsInit(false);

    scripts[0]?.file.text().then((value) => {
      setScript(value);
    });
    files[0]?.file.text().then((value) => {
      setOriginal(value);
      setModified(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function executeValue() {
    if (script === undefined) return;

    const func = new Function(script);
    const result = func.call(null, original);

    setModified(result);
  }

  function handleScriptChange(script: string | undefined) {
    setScript(script);
  }

  const fileOptions = files.map((file) => ({
    label: file.name,
    value: file.file,
  }));

  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);

  function onFileSelect(selectedFiles: Array<File>) {
    const file = selectedFiles[0];
    if (!file) return;

    file.text().then((value) => {
      setOriginal(value);
      setModified(value);
      setSelectedFiles([file]);
    });
  }

  const scriptOptions = scripts.map((script) => ({
    label: script.name,
    value: script.file,
  }));

  const [selectedScripts, setSelectedScripts] = useState<Array<File>>([]);

  function onScriptSelect(selectedFiles: Array<File>) {
    const script = selectedFiles[0];
    if (!script) return;

    script.text().then((value) => {
      setScript(value);
      setSelectedScripts([script]);
    });
  }

  return (
    <Container>
      <Dropdown
        options={fileOptions}
        selectedValues={selectedFiles}
        onValueChange={onFileSelect}
        placeholder="Select file"
        label="Files"
      />

      <Dropdown
        options={scriptOptions}
        selectedValues={selectedScripts}
        onValueChange={onScriptSelect}
        placeholder="Select script"
        label="Scripts"
      />
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
    </Container>
  );
}

const defaultScript = `// File is located in the first argument. Return the modified file.
const file = arguments[0];
return file.split(',').map((fruit, i) => fruit + i).join(',');
`;

"use client";

import {
  Box,
  Button,
  Code,
  Container,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { LuListStart } from "react-icons/lu";
import { db } from "../../../db";
import { Field } from "../../components/ui/field";
import { Dropdown } from "../../core/select/dropdown";
import { CodeEditor } from "../../features/editor/CodeEditor/CodeEditor";
import { FileDiff } from "../../features/editor/FileDiff/FileDiff";

export default function Editor() {
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

  async function onFileSelect(selectedFiles: Array<File>) {
    const file = selectedFiles[0];
    if (!file) return;

    const value = await file.text();
    setOriginal(value);
    setModified(value);
    setSelectedFiles([file]);
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
      <Box maxWidth="620px">
        <Heading as="h1" size="3xl" marginBottom="6">
          Single file editor
        </Heading>
        <Text marginBottom="6">
          Write <strong>javascript</strong> code to apply to the file. File
          selected below is provided as the first argument to the function,
          access it through
          <Code margin="0 4px">arguments[0]</Code>. Return the modified file.
        </Text>
      </Box>
      <HStack marginBottom="6" alignItems="end">
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
        <Field label="Script name" maxWidth={300}>
          <Input placeholder="Enter name..." />
        </Field>
        <Button colorPalette="purple" variant="ghost">
          <FaRegSave />
          Save script
        </Button>
      </HStack>
      <Box marginBottom="8">
        <CodeEditor
          script={script}
          language={language}
          handleScriptChange={handleScriptChange}
        />
      </Box>
      <Button marginBottom="12" onClick={executeValue} colorPalette="purple">
        <LuListStart />
        Apply script
      </Button>
      <Box maxWidth="620px">
        <Heading as="h1" size="3xl" marginBottom="6">
          File difference
        </Heading>
        <Text marginBottom="6">
          Execute the script to apply the changes to the original file.
        </Text>
      </Box>
      <Box marginBottom="8">
        <FileDiff
          original={original}
          modified={modified}
          language={selectedFiles[0]?.name.split(".").pop() || ""}
        />
      </Box>
    </Container>
  );
}

const defaultScript = `// File is located in the first argument. Return the modified file.
const selectedFile = arguments[0];
console.log(selectedFile);
return selectedFile;
`;

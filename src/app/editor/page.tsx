"use client";

import {
  Box,
  Button,
  Code,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { LuListStart } from "react-icons/lu";
import { MdRedo, MdUndo } from "react-icons/md";
import { db, FileItem } from "../../../db";
import { Field } from "../../components/ui/field";
import { Dropdown } from "../../core/select/dropdown";
import { CodeEditor } from "../../features/editor/CodeEditor/CodeEditor";
import { FileDiff } from "../../features/editor/FileDiff/FileDiff";
import { SingleFileActions } from "../../features/editor/SingleFileActions/SingleFileActions";

export default function Editor() {
  const files = useLiveQuery(() => db.files.toArray()) || [];
  const scripts = useLiveQuery(() => db.scripts.toArray()) || [];

  const language = "javascript";
  const [original, setOriginal] = useState("");

  const [script, setScript] = useState<string | undefined>(defaultScript);
  const [modified, setModified] = useState(original);

  const [versions, setVersions] = useState<Array<File>>([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);

  const [scriptName, setScriptName] = useState("");

  function applyScript() {
    if (!selectedFileItem) return;

    if (script === undefined) return;

    const func = new Function(script);
    const result = func.call(null, original);

    if (modified === result) return;

    if (currentVersionIndex < versions.length - 1) {
      // remove all versions after the current version
      versions.splice(
        currentVersionIndex + 1,
        versions.length - (currentVersionIndex + 1),
      );
    }

    const newFile = new File([result], selectedFileItem.name, {
      type: selectedFileItem.file.type,
    });

    setVersions([...versions, newFile]);
    setCurrentVersionIndex(currentVersionIndex + 1);
    setModified(result);
  }

  function handleScriptChange(script: string | undefined) {
    setScript(script);
  }

  const fileOptions = files.map((file) => ({
    label: file.name,
    value: file,
  }));

  const [selectedFileItem, setSelectedFileItem] = useState<FileItem>();

  async function onFileSelect(selected: Array<FileItem>) {
    const selectedFileItem = selected[0];
    const file = selectedFileItem.file;

    if (!file) return;

    const fileTextValue = await file.text();
    setOriginal(fileTextValue);
    setModified(fileTextValue);
    setSelectedFileItem(selectedFileItem);
    setCurrentVersionIndex(0);
    setVersions([selectedFileItem.file]);
  }

  const scriptOptions = scripts.map((script) => ({
    label: script.name,
    value: script,
  }));

  const [selectedScript, setSelectedScript] = useState<FileItem>();

  async function onScriptSelect(selected: Array<FileItem>) {
    const selectedFileItem = selected[0];
    const script = selectedFileItem.file;

    if (!script) return;

    const scriptText = await script.text();

    setScript(scriptText);
    setScriptName(selectedFileItem.name);
    setSelectedScript(selectedFileItem);
  }

  async function onFileSaved(fileItem: FileItem) {
    const fileTextValue = await fileItem.file.text();

    setOriginal(fileTextValue);
    setModified(fileTextValue);
  }

  async function onScriptSave() {
    const newFile = new File([script || ""], scriptName, {
      type: "text/javascript",
    });

    if (selectedScript) {
      selectedScript.name = scriptName;
      selectedScript.file = newFile;
      await db.scripts.put(selectedScript);
    } else {
      const newScript = {
        name: scriptName,
        extension: "js",
        file: newFile,
      };

      const createdScriptFileItem = await db.scripts.add(newScript);

      // script is not present yet
      const selectedScript = scripts.find(
        (script) => script.id === createdScriptFileItem,
      );
      setSelectedScript(selectedScript);
    }
  }

  async function undoFileChange() {
    if (!selectedFileItem) return;

    const previousVersion = versions[currentVersionIndex - 1];

    if (previousVersion) {
      const previousVersionText = await previousVersion.text();
      setModified(previousVersionText);
      setCurrentVersionIndex(currentVersionIndex - 1);
    }
  }

  async function redoFileChange() {
    if (!selectedFileItem) return;

    const nextVersion = versions[currentVersionIndex + 1];

    if (nextVersion) {
      const previousVersionText = await nextVersion.text();
      setModified(previousVersionText);
      setCurrentVersionIndex(currentVersionIndex + 1);
    }
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
          selectedValues={selectedFileItem ? [selectedFileItem] : []}
          onValueChange={onFileSelect}
          placeholder="Select file"
          label="Files"
        />

        <Dropdown
          options={scriptOptions}
          selectedValues={selectedScript ? [selectedScript] : []}
          onValueChange={onScriptSelect}
          placeholder="Select script"
          label="Scripts"
        />
        <Field label="Script name" maxWidth={300}>
          <Input
            placeholder="Enter name..."
            value={scriptName}
            onChange={(e) => setScriptName(e.target.value)}
          />
        </Field>
        <Button colorPalette="purple" variant="ghost" onClick={onScriptSave}>
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
      <HStack marginBottom="12">
        <Button
          onClick={applyScript}
          colorPalette="purple"
          disabled={!selectedFileItem}
        >
          <LuListStart />
          Apply script
        </Button>
        <IconButton
          colorPalette="purple"
          disabled={!selectedFileItem || currentVersionIndex === 0}
          rounded="full"
          variant="solid"
          onClick={undoFileChange}
        >
          <MdUndo />
        </IconButton>
        <IconButton
          colorPalette="purple"
          disabled={
            !selectedFileItem || currentVersionIndex === versions.length - 1
          }
          rounded="full"
          variant="solid"
          onClick={redoFileChange}
        >
          <MdRedo />
        </IconButton>
      </HStack>
      <Box maxWidth="620px">
        <Heading as="h1" size="3xl" marginBottom="6">
          File difference
        </Heading>
        <Text marginBottom="6">
          Apply the script to make the changes to the original file.
        </Text>
      </Box>
      <Box marginBottom="8">
        <FileDiff
          original={original}
          modified={modified}
          language={selectedFileItem?.extension || ""}
        />
      </Box>
      <SingleFileActions
        fileItem={selectedFileItem}
        newFileContent={modified}
        onFileSaved={onFileSaved}
      />
    </Container>
  );
}

const defaultScript = `// File is located in the first argument. Return the modified file.
const selectedFile = arguments[0];
console.log(selectedFile);
return selectedFile;
`;

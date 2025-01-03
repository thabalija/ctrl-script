"use client";

import { Box, Code, Container } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db, FileItem } from "../../../db";
import { SectionHeader } from "../../core/SectionHeader/SectionHeader";
import { CodeEditor } from "../../features/editor/CodeEditor/CodeEditor";
import { FileDiff } from "../../features/editor/FileDiff/FileDiff";
import { SingleFileActions } from "../../features/editor/SingleFileActions/SingleFileActions";
import { ScriptActions } from "./components/ScriptActions/ScriptActions";
import { SingleFileHeaderActions } from "./components/SingleFileHeaderActions/SingleFileHeaderActions";
import { defaultSingleFileEditorScript } from "./constants/default-single-file-editor-script.const";

export default function Editor() {
  const files = useLiveQuery(() => db.files.toArray()) || [];
  const scripts = useLiveQuery(() => db.scripts.toArray()) || [];

  const [script, setScript] = useState<string>(defaultSingleFileEditorScript);
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState(original);
  const [selectedFileFileItem, setSelectedFileFileItem] = useState<FileItem>();
  const [selectedScriptFileItem, setSelectedScriptFileItem] =
    useState<FileItem>();

  const params = useSearchParams();

  useEffect(() => {
    const fileId = params.get("fileId");
    if (fileId) {
      const selectedFile = files.find((file) => file.id === Number(fileId));
      if (selectedFile) {
        onFileSelect(selectedFile);
      }
    }

    const scriptId = params.get("scriptId");
    if (scriptId) {
      const selectedScript = scripts.find(
        (script) => script.id === Number(scriptId),
      );
      if (selectedScript) {
        onScriptSelect(selectedScript);
      }
    }
  }, [params, files, scripts]);

  async function onFileSelect(selectedFileItem: FileItem) {
    const file = selectedFileItem.file;

    if (!file) return;

    const fileTextValue = await file.text();
    setOriginal(fileTextValue);
    setModified(fileTextValue);
    setSelectedFileFileItem(selectedFileItem);
  }

  async function onScriptSelect(selectedFileItem: FileItem) {
    if (!selectedFileItem) return;

    const scriptText = await selectedFileItem.file.text();

    setScript(scriptText);
    setSelectedScriptFileItem(selectedFileItem);
  }

  async function onFileSaved(fileItem: FileItem) {
    const fileTextValue = await fileItem.file.text();

    setOriginal(fileTextValue);
    setModified(fileTextValue);
  }

  async function onFileCreated(fileItem: FileItem) {
    const fileTextValue = await fileItem.file.text();

    setOriginal(fileTextValue);
    setModified(fileTextValue);

    setSelectedFileFileItem(fileItem);
  }

  async function onSaveScript(scriptName: string) {
    if (!selectedScriptFileItem) {
      return;
    }

    const newFile = new File([script || ""], scriptName, {
      type: "text/javascript",
    });

    selectedScriptFileItem.name = scriptName;
    selectedScriptFileItem.file = newFile;
    await db.scripts.put(selectedScriptFileItem);
  }

  async function onCreateScript(scriptName: string) {
    const newFile = new File([script || ""], scriptName, {
      type: "text/javascript",
    });

    const newScript = {
      name: scriptName,
      extension: "js",
      file: newFile,
    };

    const newScriptId = await db.scripts.add(newScript);
    const selectedScript = await db.scripts.get(newScriptId);

    if (selectedScript) {
      setSelectedScriptFileItem(selectedScript);
    }
  }

  return (
    <Container>
      <SectionHeader
        title="Modify file contents"
        description={
          <>
            Write <strong>javascript</strong> code to apply to the file. File
            selected below is provided as the first argument to the function,
            access it through
            <Code margin="0 4px">arguments[0]</Code>. Return the modified file.
          </>
        }
      />
      <SingleFileHeaderActions
        files={files}
        scripts={scripts}
        selectedFile={selectedFileFileItem}
        selectedScript={selectedScriptFileItem}
        onCreateScript={onCreateScript}
        onFileSelect={onFileSelect}
        onSaveScript={onSaveScript}
        onScriptSelect={onScriptSelect}
      />
      <Box marginBottom="8">
        <CodeEditor script={script} handleScriptChange={setScript} />
      </Box>
      <ScriptActions
        original={original}
        currentFileItem={selectedFileFileItem}
        script={script}
        modified={modified}
        handleModifiedChange={setModified}
      />
      <SectionHeader
        title="File difference"
        description="Apply the script to make the changes to the original file."
      />
      <Box marginBottom="8">
        <FileDiff
          original={original}
          modified={modified}
          language={selectedFileFileItem?.extension || ""}
        />
      </Box>
      <SingleFileActions
        fileItem={selectedFileFileItem}
        newFileContent={modified}
        onFileSaved={onFileSaved}
        onFileCreated={onFileCreated}
      />
    </Container>
  );
}

"use client";

import { Button, HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FileItem } from "../../../../../db";
import { Field } from "../../../../components/ui/field";
import { Dropdown, IDropdownOption } from "../../../../core/select/dropdown";

interface ISingleFileHeaderActionsProps {
  files: Array<FileItem>;
  scripts: Array<FileItem>;
  selectedFile?: FileItem;
  selectedScript?: FileItem;
  onCreateScript: (scriptName: string) => void;
  onFileSelect: (file: FileItem) => void;
  onSaveScript: (scriptName: string) => void;
  onScriptSelect: (script: FileItem) => void;
}

export function SingleFileHeaderActions({
  files,
  scripts,
  selectedFile,
  selectedScript,
  onCreateScript,
  onFileSelect,
  onSaveScript,
  onScriptSelect,
}: ISingleFileHeaderActionsProps) {
  const [scriptName, setScriptName] = useState("");

  const [fileOptions, setFileOptions] = useState<
    Array<IDropdownOption<FileItem>>
  >([]);
  const [scriptOptions, setScriptOptions] = useState<
    Array<IDropdownOption<FileItem>>
  >([]);

  useEffect(() => {
    setFileOptions(
      files.map((file) => ({
        label: file.name,
        value: file,
      })),
    );

    setScriptOptions(
      scripts.map((script) => ({
        label: script.name,
        value: script,
      })),
    );

    if (selectedScript) {
      setScriptName(selectedScript.name);
    }
  }, [files, scripts, selectedScript]);

  return (
    <HStack marginBottom="6" alignItems="end">
      <Dropdown
        compareValues={(a, b) => a.id === b.id}
        label="File to modify"
        multiple={false}
        options={fileOptions}
        placeholder="Select file"
        selectedValues={selectedFile ? [selectedFile] : []}
        onValueChange={(selected) => onFileSelect(selected[0])}
      />

      <Dropdown
        compareValues={(a, b) => a.id === b.id}
        label="Script"
        multiple={false}
        options={scriptOptions}
        placeholder="Select script"
        selectedValues={selectedScript ? [selectedScript] : []}
        onValueChange={(selected) => onScriptSelect(selected[0])}
      />
      <Field label="Script name" maxWidth={300}>
        <Input
          placeholder="Enter name..."
          value={scriptName}
          onChange={(e) => setScriptName(e.target.value)}
        />
      </Field>
      <Button
        colorPalette="purple"
        disabled={!selectedScript}
        variant="ghost"
        onClick={() => onSaveScript(scriptName)}
      >
        <FaRegSave />
        Save script
      </Button>
      <Button
        colorPalette="purple"
        variant="ghost"
        onClick={() => onCreateScript(scriptName)}
      >
        <MdOutlineAddCircleOutline />
        Create new script
      </Button>
    </HStack>
  );
}
"use client";

import { Button, HStack, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FileItem } from "../../../../../../db";
import { Field } from "../../../../../components/ui/field";
import {
  Dropdown,
  IDropdownOption,
} from "../../../../_components/Dropdown/Dropdown";

interface IReportGeneratorHeaderActionsProps {
  files: Array<FileItem>;
  scripts: Array<FileItem>;
  selectedFiles: Array<FileItem>;
  selectedScript?: FileItem;
  onCreateScript: (scriptName: string) => void;
  onFilesSelect: (files: Array<FileItem>) => void;
  onSaveScript: (scriptName: string) => void;
  onScriptSelect: (script: FileItem) => void;
}

export function ReportGeneratorHeaderActions({
  files,
  scripts,
  selectedFiles,
  selectedScript,
  onCreateScript,
  onFilesSelect,
  onSaveScript,
  onScriptSelect,
}: IReportGeneratorHeaderActionsProps) {
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
    <Stack
      marginBottom="6"
      alignItems={["stretch", "stretch", "stretch", "end"]}
      direction={["column", "column", "column", "row"]}
    >
      <Dropdown
        compareValues={(a, b) => a.id === b.id}
        label="Files"
        onValueChange={(selected) => onFilesSelect(selected)}
        options={fileOptions}
        placeholder="Select files"
        selectedValues={selectedFiles}
        multiple={true}
      />

      <Dropdown
        compareValues={(a, b) => a.id === b.id}
        label="Scripts"
        onValueChange={(selected) => onScriptSelect(selected[0])}
        options={scriptOptions}
        placeholder="Select script"
        selectedValues={selectedScript ? [selectedScript] : []}
        multiple={false}
      />
      <Field label="Script name" maxWidth={300}>
        <Input
          placeholder="Enter name..."
          value={scriptName}
          variant="subtle"
          onChange={(e) => setScriptName(e.target.value)}
        />
      </Field>
      <HStack gap={4} marginTop={4}>
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
    </Stack>
  );
}

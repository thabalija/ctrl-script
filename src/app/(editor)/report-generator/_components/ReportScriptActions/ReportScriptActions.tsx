"use client";

import { Button, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuListStart } from "react-icons/lu";
import { MdRedo, MdUndo } from "react-icons/md";
import { FileItem } from "../../../../../../db";

interface IReportScriptActionsProps {
  selectedFileItems: Array<FileItem>;
  script: string;
  report: string;
  onGenerateReport: (report: string) => void;
}

export function ReportScriptActions({
  script,
  selectedFileItems,
  report,
  onGenerateReport,
}: IReportScriptActionsProps) {
  const [versions, setVersions] = useState<Array<string>>([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1);

  async function applyScript() {
    if (script === undefined) return;

    const func = new Function(script);

    const selectedFilesText: Array<string> = [];

    for (const fileItem of selectedFileItems) {
      const text = await fileItem.file.text();
      selectedFilesText.push(text);
    }

    const result = func.call(null, selectedFilesText);

    if (report === result) return;

    if (currentVersionIndex < versions.length - 1) {
      // remove all versions after the current version
      versions.splice(
        currentVersionIndex + 1,
        versions.length - (currentVersionIndex + 1),
      );
    }

    setVersions([...versions, result]);
    setCurrentVersionIndex(currentVersionIndex + 1);
    onGenerateReport(result);
  }

  async function undoFileChange() {
    const previousVersion = versions[currentVersionIndex - 1];

    if (previousVersion) {
      onGenerateReport(previousVersion);
      setCurrentVersionIndex(currentVersionIndex - 1);
    }
  }

  async function redoFileChange() {
    const nextVersion = versions[currentVersionIndex + 1];

    if (nextVersion) {
      onGenerateReport(nextVersion);
      setCurrentVersionIndex(currentVersionIndex + 1);
    }
  }

  return (
    <HStack marginBottom="12">
      <Button onClick={applyScript} colorPalette="purple">
        <LuListStart />
        Apply script
      </Button>
      <IconButton
        colorPalette="purple"
        disabled={currentVersionIndex <= 0}
        rounded="full"
        variant="solid"
        onClick={undoFileChange}
      >
        <MdUndo />
      </IconButton>
      <IconButton
        colorPalette="purple"
        disabled={currentVersionIndex === versions.length - 1}
        rounded="full"
        variant="solid"
        onClick={redoFileChange}
      >
        <MdRedo />
      </IconButton>
    </HStack>
  );
}

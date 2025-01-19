"use client";

import { Button, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuListStart } from "react-icons/lu";
import { MdRedo, MdUndo } from "react-icons/md";
import { FileItem } from "../../../../../../db";
import { toaster } from "../../../../../components/ui/toaster";

interface IReportGeneratorScriptActionsProps {
  selectedFileItems: Array<FileItem>;
  script: string;
  report: string;
  onGenerateReport: (report: string) => void;
}

export function ReportGeneratorScriptActions({
  script,
  selectedFileItems,
  report,
  onGenerateReport,
}: IReportGeneratorScriptActionsProps) {
  const [versions, setVersions] = useState<Array<string>>([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1);

  async function applyScript() {
    if (script === undefined) return;

    try {
      const func = new Function(script);
      const selectedFilesText: Array<string> = [];

      for (const fileItem of selectedFileItems) {
        const text = await fileItem.file.text();
        selectedFilesText.push(text);
      }

      const result = func.call(null, selectedFilesText);

      if (!(typeof result === "string")) {
        throw new Error("Script must return a string.");
      }

      updateFile(result);

      toaster.create({
        title: `Report generated successfully.`,
        type: "success",
      });
    } catch (error) {
      toaster.create({ title: `${error}`, type: "error" });
    }
  }

  function updateFile(newReportContent: string) {
    if (report === newReportContent) return;

    if (currentVersionIndex < versions.length - 1) {
      // remove all versions after the current version
      versions.splice(
        currentVersionIndex + 1,
        versions.length - (currentVersionIndex + 1),
      );
    }

    setVersions([...versions, newReportContent]);
    setCurrentVersionIndex(currentVersionIndex + 1);
    onGenerateReport(newReportContent);
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
        aria-label="Undo"
        colorPalette="purple"
        disabled={currentVersionIndex <= 0}
        rounded="full"
        variant="solid"
        onClick={undoFileChange}
      >
        <MdUndo />
      </IconButton>
      <IconButton
        aria-label="Redo"
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

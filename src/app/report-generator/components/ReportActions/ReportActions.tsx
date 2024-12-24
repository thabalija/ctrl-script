"use client";

import { Button, HStack } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { FileMetaForm } from "../../../../features/file-meta-form/FileMetaForm/FileMetaForm";
import { downloadFile } from "../../../../helpers/download-file";

interface IReportActionsProps {
  reportName: string;
  reportExtension: string;
  report: string;
  setReportName: (name: string) => void;
  setReportExtension: (extension: string) => void;
}

export function ReportActions({
  report,
  reportExtension,
  reportName,
  setReportExtension,
  setReportName,
}: IReportActionsProps) {
  async function onDownload() {
    const newFile = new File([report], reportName, {
      type: reportExtension,
    });

    downloadFile(newFile, `${reportName}.${reportExtension}`);
  }

  return (
    <HStack marginBottom="6" alignItems="end" gap={4}>
      <FileMetaForm
        name={reportName}
        extension={reportExtension}
        onNameChange={setReportName}
        onExtensionChange={setReportExtension}
      />

      <Button
        colorPalette="purple"
        disabled={!report.length}
        variant="ghost"
        onClick={onDownload}
      >
        <FiDownload />
        Download report
      </Button>
    </HStack>
  );
}

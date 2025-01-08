"use client";

import { Button, Stack } from "@chakra-ui/react";
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
    <Stack
      alignItems={"end"}
      direction={"row"}
      flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
      gap={4}
      marginBottom="6"
    >
      <FileMetaForm
        name={reportName}
        extension={reportExtension}
        onNameChange={setReportName}
        onExtensionChange={setReportExtension}
      />

      <Button
        colorPalette="purple"
        disabled={!report.length}
        variant="solid"
        onClick={onDownload}
      >
        <FiDownload />
        Download
      </Button>
    </Stack>
  );
}

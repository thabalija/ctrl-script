"use client";

import { Box, Code, Container } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db, FileItem } from "../../../../db";
import { SectionHeader } from "../../_components/SectionHeader/SectionHeader";
import { CodeEditor } from "../_components/CodeEditor/CodeEditor";
import { FileOutputEditor } from "../_components/FileOutputEditor/FileOutputEditor";
import { ReportGeneratorFooter } from "./_components/ReportGeneratorFooter/ReportGeneratorFooter";
import { ReportGeneratorHeader } from "./_components/ReportGeneratorHeader/ReportGeneratorHeader";
import { ReportGeneratorScriptActions } from "./_components/ReportGeneratorScriptActions/ReportGeneratorScriptActions";
import { defaultReportGeneratorScript } from "./_constants/defaultReportGeneratorScript";

export default function ReportGenerator() {
  const files = useLiveQuery(() => db.files.toArray()) || [];
  const scripts = useLiveQuery(() => db.scripts.toArray()) || [];

  const [script, setScript] = useState<string>(defaultReportGeneratorScript);
  const [report, setReport] = useState("");
  const [reportName, setReportName] = useState("Report");
  const [reportExtension, setReportExtension] = useState("txt");

  const [selectedFileFileItems, setSelectedFileFileItems] = useState<
    Array<FileItem>
  >([]);
  const [selectedScriptFileItem, setSelectedScriptFileItem] =
    useState<FileItem>();

  const params = useSearchParams();

  useEffect(() => {
    const fileIds = (params.get("fileIds") || "").split(",").map(Number);
    if (fileIds.length) {
      const selectedFiles: Array<FileItem> = fileIds
        .map((fileId) => files.find((file) => file.id === fileId))
        .filter(Boolean) as Array<FileItem>;

      if (selectedFiles.length) {
        setSelectedFileFileItems(selectedFiles);
        // TODO: on dropdown select also
      }
    }
  }, [params, files]);

  async function onScriptSelect(selectedFileItem: FileItem) {
    if (!selectedFileItem) return;

    const scriptText = await selectedFileItem.file.text();

    setScript(scriptText);
    setSelectedScriptFileItem(selectedFileItem);
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
        title="Generate reports"
        description={
          <>
            Write <strong>javascript</strong> code to apply to the selected
            files. Selected files are provided as the first argument to the
            function, access it through
            <Code margin="0 4px">arguments[0]</Code>. Return the combined value
            to get the report.
          </>
        }
      />
      <ReportGeneratorHeader
        files={files}
        scripts={scripts}
        selectedFiles={selectedFileFileItems}
        selectedScript={selectedScriptFileItem}
        onCreateScript={onCreateScript}
        onFilesSelect={setSelectedFileFileItems}
        onSaveScript={onSaveScript}
        onScriptSelect={onScriptSelect}
      />
      <Box marginBottom="8">
        <CodeEditor script={script} onScriptChange={setScript} />
      </Box>
      <ReportGeneratorScriptActions
        report={report}
        script={script}
        selectedFileItems={selectedFileFileItems}
        onGenerateReport={setReport}
      />
      <SectionHeader
        title="Output"
        description="Apply the script to the selected files to generate the report."
      />

      <Box marginBottom="8">
        <FileOutputEditor
          output={report}
          extension={reportExtension}
          onChange={setReport}
        />
      </Box>
      <ReportGeneratorFooter
        report={report}
        reportExtension={reportExtension}
        reportName={reportName}
        setReportExtension={setReportExtension}
        setReportName={setReportName}
      />
    </Container>
  );
}

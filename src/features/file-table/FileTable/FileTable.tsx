"use client";

import { FileItem } from "../../../../db";

import { Code, IconButton, Table } from "@chakra-ui/react";
import { FiDownload, FiPenTool } from "react-icons/fi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { Checkbox } from "../../../components/ui/checkbox";
import { downloadFile } from "../../../helpers/download-file";

export interface IFileTableProps {
  selectedFileIds: Array<number>;
  files: Array<FileItem>;
  canSelectFiles?: boolean;
  onDeleteFileItem: (fileItem: FileItem) => unknown;
  onEditFileItem: (id: number) => unknown;
  onSelectFileItems: (ids: Array<number>) => unknown;
}

export function FileTable({
  selectedFileIds,
  files,
  onDeleteFileItem,
  onEditFileItem,
  onSelectFileItems,
}: IFileTableProps) {
  const hasSelection = selectedFileIds.length > 0;
  const indeterminate = hasSelection && selectedFileIds.length < files.length;

  function onDownloadFileItem(fileItem: FileItem) {
    downloadFile(fileItem.file, `${fileItem.name}.${fileItem.extension}`);
  }

  function onSelectAll({ checked }: { checked: boolean | "indeterminate" }) {
    const selected = checked ? files.map((item) => item.id) : [];
    onSelectFileItems(selected);
  }

  function onSelectItem(
    fileItem: FileItem,
    checked: boolean | "indeterminate",
  ) {
    const selected = checked
      ? [...selectedFileIds, fileItem.id]
      : selectedFileIds.filter((id) => id !== fileItem.id);

    onSelectFileItems(selected);
  }

  const rows = files.map((fileItem) => (
    <Table.Row key={fileItem.id}>
      <Table.Cell>
        <Checkbox
          top="1"
          aria-label="Select row"
          checked={selectedFileIds.includes(fileItem.id)}
          onCheckedChange={({ checked }) => {
            onSelectItem(fileItem, checked);
          }}
        />
      </Table.Cell>
      <Table.Cell fontWeight="bold">{fileItem.name}</Table.Cell>
      <Table.Cell>
        <Code>{fileItem.extension}</Code>
      </Table.Cell>
      <Table.Cell>
        {new Date(fileItem.file.lastModified).toDateString()}
      </Table.Cell>
      <Table.Cell textAlign="center">
        <IconButton
          colorPalette="purple"
          rounded="full"
          variant="ghost"
          onClick={() => onEditFileItem(fileItem.id)}
        >
          <FiPenTool />
        </IconButton>

        <IconButton
          colorPalette="green"
          rounded="full"
          variant="ghost"
          onClick={() => onDownloadFileItem(fileItem)}
        >
          <FiDownload />
        </IconButton>

        <IconButton
          colorPalette="red"
          rounded="full"
          variant="ghost"
          onClick={() => onDeleteFileItem(fileItem)}
        >
          <IoMdRemoveCircleOutline />
        </IconButton>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" maxHeight="410px">
      <Table.Root stickyHeader size="lg">
        <Table.Header>
          <Table.Row bg="bg.muted">
            <Table.ColumnHeader w="6">
              <Checkbox
                top="1"
                aria-label="Select all rows"
                checked={
                  indeterminate ? "indeterminate" : selectedFileIds.length > 0
                }
                onCheckedChange={onSelectAll}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Last modified</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}

"use client";

import { FileItem } from "../../../../db";

import { Code, IconButton, Table } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { FiDownload, FiPenTool } from "react-icons/fi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { downloadFile } from "../../../helpers/download-file";

export interface IFileTableProps {
  files: Array<FileItem>;
  onDeleteFileItem: (fileItem: FileItem) => void;
}

export function FileTable({ files, onDeleteFileItem }: IFileTableProps) {
  function onDownloadFileItem(fileItem: FileItem) {
    downloadFile(fileItem.file, `${fileItem.name}.${fileItem.extension}`);
  }

  function onEditFileItem(fileItem: FileItem) {
    redirect(`/editor?fileId=${fileItem.id}`);
  }

  const rows = files.map((fileItem) => (
    <Table.Row key={fileItem.id}>
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
          onClick={() => onEditFileItem(fileItem)}
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
    <>
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Last modified</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </>
  );
}

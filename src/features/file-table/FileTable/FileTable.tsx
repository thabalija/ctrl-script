"use client";

import { FileItem } from "../../../../db";

import { IconButton, Link, Table } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaDownload, FaRegPenToSquare } from "react-icons/fa6";
import { downloadFile } from "../../../helpers/download-file";

export interface IFileTableProps {
  files?: Array<FileItem>;
  onDeleteFileItem: (fileItem: FileItem) => void;
}

export function FileTable({ files, onDeleteFileItem }: IFileTableProps) {
  function onDownloadFileItem(fileItem: FileItem) {
    downloadFile(fileItem.file, `${fileItem.name}.${fileItem.extension}`);
  }

  const emptyState = <p>Loading...</p>;

  const rows = (files || []).map((fileItem) => (
    <Table.Row key={fileItem.id}>
      <Table.Cell>{fileItem.name}</Table.Cell>
      <Table.Cell>{fileItem.extension}</Table.Cell>
      <Table.Cell>
        {new Date(fileItem.file.lastModified).toDateString()}
      </Table.Cell>
      <Table.Cell>
        <IconButton
          onClick={() => onDeleteFileItem(fileItem)}
          rounded="full"
          variant="ghost"
        >
          <FaRegTrashAlt />
        </IconButton>

        <Link href="/editor">
          <IconButton rounded="full" variant="ghost">
            <FaRegPenToSquare />
          </IconButton>
        </Link>

        <IconButton
          onClick={() => onDownloadFileItem(fileItem)}
          rounded="full"
          variant="ghost"
        >
          <FaDownload />
        </IconButton>
      </Table.Cell>
    </Table.Row>
  ));

  const table = (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Last modified</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </>
  );

  return files === undefined ? emptyState : table;
}

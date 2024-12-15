"use client";

import { db, FileItem } from "../../../../db";

import { IconButton, Link, Table } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaDownload, FaRegPenToSquare } from "react-icons/fa6";

export interface IFilesTableProps {
  files?: Array<FileItem>;
}

export function FilesTable({ files }: IFilesTableProps) {
  function onDeleteFileItem(fileItem: FileItem) {
    db.files.delete(fileItem.id);
  }

  function onDownloadFileItem(fileItem: FileItem) {
    const url = URL.createObjectURL(fileItem.file);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${fileItem.name}.${fileItem.extension}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
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

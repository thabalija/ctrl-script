"use client";

import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import * as zip from "@zip.js/zip.js";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FileItem } from "../../../db";
import { FileDropzone } from "../../features/file-upload/FileDropzone/FileDropzone";
import { FileTable } from "../../features/file-table/FileTable/FileTable";

export default function FilesContainer() {
  const files = useLiveQuery(() => db.files.toArray());
  function onDeleteFile(fileItem: FileItem) {
    db.files.delete(fileItem.id);
  }

  async function onAddFiles(fileList: FileList | null) {
    if (!fileList?.length) {
      return;
    }

    Array.from(fileList).forEach(async (file) => {
      const fileNameParts = file.name.split(".");
      const extension = fileNameParts.pop() || "txt";
      const name = fileNameParts.join("");

      await db.files.add({
        name,
        extension,
        file,
        versions: [file],
      });
    });
  }

  async function onDownloadAllFiles() {
    const zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"), {
      bufferedWrite: true,
    });

    const fileList = files || [];
    const zipFileNames: Array<string> = [];

    for (const file of fileList) {
      let fileForDownload = file.file;

      const zipContainsFileWithSameName = Boolean(
        zipFileNames.find((fileName) => fileName === fileForDownload.name),
      );

      if (zipContainsFileWithSameName) {
        fileForDownload = renameFile(
          file.file,
          `${file.name}_modified.${file.extension}`,
        );
      }

      zipFileNames.push(fileForDownload.name);
      await zipWriter.add(
        fileForDownload.name,
        new zip.BlobReader(fileForDownload),
      );
    }

    const blobURL = URL.createObjectURL(await zipWriter.close());
    const downloadLink = document.createElement("a");
    downloadLink.href = blobURL;
    downloadLink.download = "files.zip";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  function renameFile(originalFile: File, newName: string): File {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  return (
    <Container>
      <FileDropzone onAddFiles={onAddFiles} />
      <Heading as="h1">Files</Heading>
      <FileTable files={files} onDeleteFileItem={onDeleteFile} />
      <Flex>
        <Button>Execute value</Button>
        <Button onClick={onDownloadAllFiles}>Download all files</Button>
      </Flex>
    </Container>
  );
}

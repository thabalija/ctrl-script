"use client";

import { Button } from "@chakra-ui/react";
import * as zip from "@zip.js/zip.js";
import { FileItem } from "../../../../db";
import { downloadFile } from "../../../helpers/download-file";
import { renameFile } from "../../../helpers/rename-file";

export interface IDownloadFilesProps {
  files: Array<FileItem>;
  label: string;
}

export default function IDownloadFilesProps({
  files,
  label,
}: IDownloadFilesProps) {
  async function onDownloadFiles() {
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

    downloadFile(await zipWriter.close(), "data.zip");
  }

  return <Button onClick={onDownloadFiles}>{label}</Button>;
}

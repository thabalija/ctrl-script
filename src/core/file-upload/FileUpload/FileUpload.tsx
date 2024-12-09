"use client";

import { useState } from "react";
import { db } from "../../../../db";

export function FileUpload() {
  const [files, setFiles] = useState<FileList | null>();

  async function addFiles() {
    try {
      if (!files?.length) {
        return;
      }

      const firstFile = files[0];

      await db.fileItems.add({
        name: firstFile.name,
        extension: firstFile.name.split(".").pop() as string,
        file: firstFile,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        multiple={true}
      />
      <button onClick={addFiles} type="button">
        Add files
      </button>
    </>
  );
}

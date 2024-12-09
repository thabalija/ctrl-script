"use client";

import Link from "next/link";
import { useState } from "react";

export default function Files() {
  const [files, setFiles] = useState<FileList | null>();

  function handleRun() {
    console.log(files);
  }

  return (
    <>
      <Link href="/">Home</Link>
      <div>Files</div>;
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <button onClick={handleRun} type="button">
        Log files
      </button>
    </>
  );
}

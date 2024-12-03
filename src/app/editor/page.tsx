'use client';

import Editor from '@monaco-editor/react';
import Link from 'next/link';
import { useRef } from 'react';

interface ICodeEditor {
  getValue(): string;
}

export default function Home() {
  const editorRef = useRef<ICodeEditor>();

  function handleEditorDidMount(editor: ICodeEditor) {
    editorRef.current = editor;
  }

  function executeValue() {
    if (editorRef.current === undefined) return;

    console.log((eval(editorRef.current.getValue())));
  }

  return (
    <>
      <button onClick={executeValue}>Execute value</button>
      <Link href="/">Home</Link>
      <Editor
        height="90vh"
        defaultValue='alert("Foo!")'
        language="javascript"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </>
  );
}

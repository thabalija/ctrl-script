'use client';

import Editor, { DiffEditor, MonacoDiffEditor } from '@monaco-editor/react';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface ICodeEditor {
  getValue(): string;
}

export default function Home() {
  const editorRef = useRef<ICodeEditor>();
  const diffEditorRef = useRef<MonacoDiffEditor>();

  const original = 'banana, apple, orange';
  const [modified, setModified] = useState(original);

  function handleEditorDidMount(editor: ICodeEditor) {
    editorRef.current = editor;
  }

  function executeValue() {
    if (editorRef.current === undefined) return;

    const func = new Function(editorRef.current.getValue());
    const result = func.call( null, original );

    setModified(result);
  }

  function handleDiffEditorDidMount(editor: MonacoDiffEditor) {
    diffEditorRef.current = editor;
  }

  return (
    <>
      <button onClick={executeValue}>Execute value</button>
      <Link href="/">Home</Link>
      <Editor
        height="40vh"
        defaultValue="return arguments[0].split(',').map((fruit, i) => fruit + i).join(',');"
        language="javascript"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
      <br />
      <DiffEditor
        height="40vh"
        language="javascript"
        theme="vs-dark"
        original={original}
        modified={modified}
        onMount={handleDiffEditorDidMount}
      />
    </>
  );
}



"use client";

import { Button, HStack, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuListStart } from "react-icons/lu";
import { MdRedo, MdUndo } from "react-icons/md";
import { FileItem } from "../../../../../../db";

interface IScriptActionsProps {
  currentFileItem?: FileItem;
  script: string;
  modified: string;
  original: string;
  onModifiedChange: (newModifiedVersion: string) => void;
}

export function ScriptActions({
  currentFileItem,
  script,
  modified,
  original,
  onModifiedChange,
}: IScriptActionsProps) {
  const [versions, setVersions] = useState<Array<File>>([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);

  useEffect(() => {
    if (!currentFileItem) return;

    setCurrentVersionIndex(0);
    setVersions([currentFileItem.file]);
  }, [currentFileItem]);

  function applyScript() {
    if (!currentFileItem) return;

    if (script === undefined) return;

    const func = new Function(script);
    const result = func.call(null, original);

    if (modified === result) return;

    if (currentVersionIndex < versions.length - 1) {
      // remove all versions after the current version
      versions.splice(
        currentVersionIndex + 1,
        versions.length - (currentVersionIndex + 1),
      );
    }

    const newFile = new File([result], currentFileItem.name, {
      type: currentFileItem.file.type,
    });

    setVersions([...versions, newFile]);
    setCurrentVersionIndex(currentVersionIndex + 1);
    onModifiedChange(result);
  }

  async function undoFileChange() {
    if (!currentFileItem) return;

    const previousVersion = versions[currentVersionIndex - 1];

    if (previousVersion) {
      const previousVersionText = await previousVersion.text();
      onModifiedChange(previousVersionText);
      setCurrentVersionIndex(currentVersionIndex - 1);
    }
  }

  async function redoFileChange() {
    if (!currentFileItem) return;

    const nextVersion = versions[currentVersionIndex + 1];

    if (nextVersion) {
      const previousVersionText = await nextVersion.text();
      onModifiedChange(previousVersionText);
      setCurrentVersionIndex(currentVersionIndex + 1);
    }
  }

  return (
    <HStack marginBottom="12">
      <Button
        onClick={applyScript}
        colorPalette="purple"
        disabled={!currentFileItem}
      >
        <LuListStart />
        Apply script
      </Button>
      <IconButton
        colorPalette="purple"
        disabled={!currentFileItem || currentVersionIndex === 0}
        rounded="full"
        variant="solid"
        onClick={undoFileChange}
      >
        <MdUndo />
      </IconButton>
      <IconButton
        colorPalette="purple"
        disabled={
          !currentFileItem || currentVersionIndex === versions.length - 1
        }
        rounded="full"
        variant="solid"
        onClick={redoFileChange}
      >
        <MdRedo />
      </IconButton>
    </HStack>
  );
}

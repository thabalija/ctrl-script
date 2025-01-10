"use client";

import { IconButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

export interface IDeleteButtonProps {
  dialogTitle?: string;
  dialogDescription?: string;
  onDelete: () => unknown;
}

export function DeleteButton({
  dialogTitle,
  dialogDescription,
  onDelete,
}: IDeleteButtonProps) {
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);

  function openConfirmationDialog() {
    deleteButtonRef.current?.blur();

    setTimeout(() => {
      // wait for focus to be removed before showing the dialog
      setDeleteDialogVisible(true);
    });
  }

  function onDeleteFileDialogClose(shouldDelete: boolean) {
    if (shouldDelete) {
      onDelete();
    }

    setDeleteDialogVisible(false);
  }

  return (
    <>
      <IconButton
        colorPalette="red"
        rounded="full"
        variant="ghost"
        ref={deleteButtonRef}
        onClick={openConfirmationDialog}
      >
        <IoMdRemoveCircleOutline />
      </IconButton>

      <ConfirmationDialog
        open={isDeleteDialogVisible}
        title={dialogTitle}
        description={dialogDescription}
        onClose={onDeleteFileDialogClose}
      />
    </>
  );
}

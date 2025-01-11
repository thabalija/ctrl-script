"use client";

import { FC, useState } from "react";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

export interface IConfirmActionProps {
  title: string;
  description: string;
  children: FC<{ openDialog: () => void }>;
  onConfirm: () => unknown;
}

export function ConfirmAction({
  title,
  description,
  children,
  onConfirm,
}: IConfirmActionProps) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  function openDialog() {
    setIsDialogVisible(true);
  }

  function onDialogClose(confirmed: boolean) {
    if (confirmed) {
      onConfirm();
    }

    setIsDialogVisible(false);
  }

  return (
    <>
      {children({ openDialog })}

      <ConfirmationDialog
        open={isDialogVisible}
        title={title}
        description={description}
        onClose={onDialogClose}
      />
    </>
  );
}

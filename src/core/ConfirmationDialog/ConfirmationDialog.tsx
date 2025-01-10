"use client";

import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

interface IConfirmationDialogProps {
  cancelText?: string;
  confirmText?: string;
  description?: string;
  open: boolean;
  onClose: (confirmed: boolean) => unknown;
  title?: string;
}

export function ConfirmationDialog({
  cancelText = "No",
  confirmText = "Yes",
  description,
  open,
  onClose,
  title,
}: IConfirmationDialogProps) {
  function onOpenChange(e: { open: boolean }) {
    onClose(e.open);
  }

  return (
    <DialogRoot
      lazyMount
      placement="center"
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        {title ? (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        ) : undefined}
        <DialogBody>{description ?? undefined}</DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose(false)}>
            {cancelText}
          </Button>
          <Button onClick={() => onClose(true)}>{confirmText}</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

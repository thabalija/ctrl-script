"use client";

import { Input } from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";

interface IFileMetaFormProps {
  name: string;
  extension: string;
  onNameChange: (name: string) => void;
  onExtensionChange: (extension: string) => void;
}

export function FileMetaForm({
  name,
  extension,
  onNameChange,
  onExtensionChange,
}: IFileMetaFormProps) {
  return (
    <>
      <Field label="File name" maxWidth={300}>
        <Input
          placeholder="Enter file name"
          value={name}
          variant="subtle"
          onChange={(e) => onNameChange(e.target.value)}
        />
      </Field>
      <Field label="Extension" maxWidth={150}>
        <Input
          placeholder="Enter extension"
          value={extension}
          variant="subtle"
          onChange={(e) => onExtensionChange(e.target.value)}
        />
      </Field>
    </>
  );
}

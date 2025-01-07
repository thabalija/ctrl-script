"use client";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";

export interface IDropdownOption<T> {
  label: string;
  value: T;
}

export interface IDropdownProps<T> {
  disabled?: boolean;
  label?: string;
  multiple: boolean;
  onValueChange: (value: Array<T>) => unknown;
  options: Array<IDropdownOption<T>>;
  placeholder?: string;
  selectedValues: Array<T>;
  compareValues?: (a: T, b: T) => boolean;
}

export function Dropdown<T>({
  disabled = false,
  label,
  multiple,
  options,
  placeholder,
  selectedValues,
  onValueChange,
  compareValues,
}: IDropdownProps<T>) {
  function onItemSelect(selectedValues: Array<string>) {
    const selectedRawValues = selectedValues.map(
      (index) => options[Number(index)].value,
    );
    onValueChange(selectedRawValues);
  }

  const selectOptions = createListCollection({
    items: options.map((option, index) => ({
      label: option.label,
      value: index.toString(),
      rawValue: option.value,
    })),
  });

  const selectedOptionIndexes = selectedValues.map((selectedValue) =>
    selectOptions.items
      .findIndex((option) => {
        return compareValues
          ? compareValues(option.rawValue, selectedValue)
          : option.rawValue === selectedValue;
      })
      .toString(),
  );

  return (
    <SelectRoot
      collection={selectOptions}
      disabled={disabled}
      minWidth="200px"
      multiple={multiple}
      value={selectedOptionIndexes}
      variant="subtle"
      onValueChange={(e) => onItemSelect(e.value)}
    >
      {label ? <SelectLabel>{label}</SelectLabel> : null}
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.items.map((option) => (
          <SelectItem item={option} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

"use client";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  Button,
  createListCollection,
  ListCollection,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdChecklist } from "react-icons/md";

export interface IDropdownOption<T> {
  label: string;
  value: T;
}

export interface IDropdownProps<T> {
  disabled?: boolean;
  emptyLabel?: string;
  label?: string;
  multiple: boolean;
  options: Array<IDropdownOption<T>>;
  placeholder?: string;
  selectedValues: Array<T>;
  compareValues?: (a: T, b: T) => boolean;
  onValueChange: (value: Array<T>) => unknown;
}

interface IDropdownOptionInternal<T> {
  label: string;
  value: string;
  rawValue: T;
}

export function Dropdown<T>({
  disabled = false,
  emptyLabel,
  label,
  multiple,
  options,
  placeholder,
  selectedValues,
  onValueChange,
  compareValues,
}: IDropdownProps<T>) {
  const [selectOptions, setSelectOptions] =
    useState<ListCollection<IDropdownOptionInternal<T>>>();

  const [selectedOptionIndexes, setSelectedOptionIndexes] =
    useState<Array<string>>();

  const areAllOptionsSelected = selectedValues.length === options.length;

  useEffect(() => {
    setSelectOptions(
      createListCollection({
        items: options.map((option, index) => ({
          label: option.label,
          value: index.toString(),
          rawValue: option.value,
        })),
      }),
    );

    const selectedIndexes: Array<string> = selectedValues.map(
      (selectedValue) =>
        selectOptions?.items
          .findIndex((option) => {
            return compareValues
              ? compareValues(option.rawValue, selectedValue)
              : option.rawValue === selectedValue;
          })
          .toString() || "",
    );

    setSelectedOptionIndexes(selectedIndexes);
  }, [options, selectedValues]);

  function onItemSelect(selectedValues: Array<string>) {
    const selectedRawValues = selectedValues.map(
      (index) => options[Number(index)].value,
    );
    onValueChange(selectedRawValues);
  }

  function onSelectUnselectAll() {
    if (areAllOptionsSelected) {
      onValueChange([]);
    } else {
      onValueChange(options.map((option) => option.value));
    }
  }

  return selectOptions ? (
    <>
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
          {selectOptions.items.length ? (
            <>
              {multiple ? (
                <Button
                  onClick={onSelectUnselectAll}
                  variant="ghost"
                  margin={2}
                  colorPalette={"purple"}
                >
                  <MdChecklist />

                  {areAllOptionsSelected ? "Unselect All" : "Select All"}
                </Button>
              ) : null}
              {selectOptions.items.map((option) => (
                <SelectItem item={option} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}{" "}
            </>
          ) : (
            <>
              <Text padding="2">{emptyLabel}</Text>
            </>
          )}
        </SelectContent>
      </SelectRoot>
    </>
  ) : null;
}

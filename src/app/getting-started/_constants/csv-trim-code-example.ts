export const CSV_TRIM_CODE_EXAMPLE = `const selectedFile = arguments[0];

const updatedFile = selectedFile
  .split("\\n")
  .map((row) =>
    row
      .split(";")
      .map((cell) => cell.trim())
      .join(";")
  )
  .join("\\n");

return updatedFile;`;

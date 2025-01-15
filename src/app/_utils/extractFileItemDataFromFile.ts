export function extractFileItemDataFromFile(file: File) {
  const fileNameParts = file.name.split(".");
  const extension = fileNameParts.pop() || "txt";
  const name = fileNameParts.join("");

  return { name, extension, file };
}

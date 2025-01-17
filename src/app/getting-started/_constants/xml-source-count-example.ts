export const XML_SOURCE_COUNT_EXAMPLE = `const selectedFiles = arguments[0];

return selectedFiles
  .map((selectedFile) => {
    const parser = new DOMParser();
    const content = parser.parseFromString(selectedFile, "application/xml");
    return Array.from(content.querySelectorAll("source"))
      .map((sourceElement) => sourceElement.textContent.trim())
      .filter(Boolean).length;
  })
  .reduce((acc, val) => acc + val, 0)
  .toString();`;

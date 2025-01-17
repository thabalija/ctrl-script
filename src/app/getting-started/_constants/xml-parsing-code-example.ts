export const XML_PARSING_CODE_EXAMPLE = `const selectedFile = arguments[0];

const parser = new DOMParser();
const content = parser.parseFromString(selectedFile, "application/xml");
content
  .querySelectorAll("segment source")
  .forEach((segment) => (segment.textContent = segment.textContent.trim()));

const serializer = new XMLSerializer();
const updatedFile = serializer.serializeToString(content);

return updatedFile;`;

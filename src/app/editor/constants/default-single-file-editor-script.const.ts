export const defaultSingleFileEditorScript = `// File is located in the first argument. Return the modified file.
const selectedFile = arguments[0];
console.log(selectedFile);
return selectedFile;
`;

export const defaultReportGeneratorScript = `// Files are located in the first argument. Return the result.
const selectedFiles = arguments[0];
console.log(selectedFiles);
return selectedFiles.join('');
`;

export function downloadFile(blob: Blob, fileName: string): void {
  const blobURL = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = blobURL;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

import { Page } from "@playwright/test";

export async function uploadFile(
  page: Page,
  inputPlaceholder: string,
  filePath: string,
) {
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByText(inputPlaceholder).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filePath);
}

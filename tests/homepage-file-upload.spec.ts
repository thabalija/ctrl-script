import { expect, test } from "@playwright/test";
import path from "path";
import { ROUTE } from "../src/app/_constants/route";

test.describe("Homepage file upload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("should upload a text file, navigate to files page, and display the file", async ({
    page,
  }) => {
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("Start by selecting files...").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, "./_assets/text-file.txt"));

    await page.waitForURL(`${ROUTE.FILES}/`);

    await expect(page.getByText("text-file")).toBeVisible();
  });

  test("should unpack a zip file and upload files inside, navigate to files page, and display the file", async ({
    page,
  }) => {
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("Start by selecting files...").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, "./_assets/zip-file.zip"));

    await page.waitForURL(`${ROUTE.FILES}/`);

    await expect(page.getByText("zipped-test-file")).toBeVisible();
  });
});

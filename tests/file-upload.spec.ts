import { expect, test } from "@playwright/test";
import { ROUTE } from "../src/app/_constants/route";
import { uploadFile } from "./_utils/uploadFile";

test.describe("Homepage file upload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("should upload a text file, navigate to files page, and display the file", async ({
    page,
  }) => {
    await uploadFile(
      page,
      "Start by selecting files...",
      "./_assets/text-file.txt",
    );
    await page.waitForURL(`${ROUTE.FILES}/`);

    await expect(page.getByText("text-file")).toBeVisible();
  });

  test("should unpack a zip file and upload files inside, navigate to files page, and display the file", async ({
    page,
  }) => {
    await uploadFile(
      page,
      "Start by selecting files...",
      "./_assets/zipped-file.zip",
    );
    await page.waitForURL(`${ROUTE.FILES}/`);

    await expect(page.getByText("zipped-test-file")).toBeVisible();
  });
});

test.describe("Files page file upload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${ROUTE.FILES}/`);
  });

  test("should upload a text file and display the file", async ({ page }) => {
    await uploadFile(page, "Select any text file", "./_assets/text-file.txt");
    await expect(page.getByText("text-file")).toBeVisible();
  });

  test("should unpack a zip file and upload files inside and display the file", async ({
    page,
  }) => {
    await uploadFile(page, "Select any text file", "./_assets/zipped-file.zip");
    await expect(page.getByText("zipped-test-file")).toBeVisible();
  });
});

test.describe("Scripts page file upload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${ROUTE.FILES}/`);
  });

  test("should upload a text file and display the file", async ({ page }) => {
    await uploadFile(page, "Select any text file", "./_assets/test-script.js");
    await expect(page.getByText("test-script")).toBeVisible();
  });

  test("should unpack a zip file and upload files inside and display the file", async ({
    page,
  }) => {
    await uploadFile(
      page,
      "Select any text file",
      "./_assets/zipped-script.zip",
    );
    await expect(page.getByText("zipped-test-script")).toBeVisible();
  });
});

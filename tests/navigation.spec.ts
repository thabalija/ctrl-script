import test, { expect } from "@playwright/test";
import { ROUTE } from "../src/app/_constants/route";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("Files link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Files" });
    link.click();
    await page.waitForURL(`${ROUTE.FILES}/`);

    await expect(page.getByText("Start by selecting text files")).toBeVisible();
  });

  test("Scripts link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Scripts" });
    link.click();
    await page.waitForURL(`${ROUTE.SCRIPTS}/`);

    await expect(
      page.getByText("Start by importing some scripts"),
    ).toBeVisible();
  });

  test("Editor link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Editor" });
    link.click();
    await page.waitForURL(`${ROUTE.EDITOR}/`);

    await expect(page.getByText("Modify file contents")).toBeVisible();
  });

  test("Report Generator link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Report Generator" });
    link.click();
    await page.waitForURL(`${ROUTE.REPORT_GENERATOR}/`);

    await expect(page.getByText("Generate reports")).toBeVisible();
  });

  test("Getting Started link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Getting Started" });
    link.click();
    await page.waitForURL(`${ROUTE.GETTING_STARTED}/`);

    await expect(page.getByText("How to import files?")).toBeVisible();
  });

  test("Homepage link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Getting Started" });
    link.click();
    await page.waitForURL(`${ROUTE.GETTING_STARTED}/`);

    const homeLink = page.getByRole("link", { name: "CTRL Script" });
    homeLink.click();
    await page.waitForURL(`./`);

    await expect(
      page.getByText(
        "Edit, Apply, and Conquer. Bulk File Scripting Made Simple.",
      ),
    ).toBeVisible();
  });
});

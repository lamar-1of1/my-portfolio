import { test, expect } from "@playwright/test";

test("navigates from home to projects", async ({ page }) => {
    await page.goto("/");
    await expect(
        page.getByRole("heading", { name: "Hi, I'm Lamar" })
    ).toBeVisible();

    await page.getByRole("link", { name: "View Projects" }).first().click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
        page.getByRole("heading", { name: /Selected Works/i })
    ).toBeVisible();
});

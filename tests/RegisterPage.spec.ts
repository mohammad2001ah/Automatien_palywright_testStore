import {test, expect} from '@playwright/test';

test.describe("Register Page", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://automationteststore.com/");
  });
  test("Navigate to Register Page", async ({page}) => {
    await page.getByRole('link', {name: 'Login or register'}).click();
    await page.locator('button[title="Continue"]').click();
    await expect(page).toHaveURL(/account\/create/);
  });

  test("Verify user can register successfully", async ({page}) => {});
});
import {test, expect} from '@playwright/test';

test.describe("Automation Store", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://automationteststore.com/");
  });
test("Verfiy Website open successfully", async ({page}) => {
  await expect(page).toHaveURL("https://automationteststore.com/");
});
test("Verify user can open login page", async ({page}) => {
  await page.getByRole('link', {name: 'Login or register'}).click();
  await expect(page).toHaveURL(/account\/login/);
});

test("Verify user can open register page", async ({page}) => {
  await page.getByRole('link', {name: 'Login or register'}).click();
  await page.locator('button[title="Continue"]').click();
  await expect(page).toHaveURL(/account\/create/);
});

});

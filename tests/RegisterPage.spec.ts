import { test, expect } from '@playwright/test';

test.describe("Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://automationteststore.com/");
    await page.getByRole('link', { name: 'Login or register' }).click();
    await page.locator('button[title="Continue"]').click();
    await expect(page).toHaveURL(/account\/create/);
  });

  test("Verify user can register successfully", async ({ page }) => {
    await page.locator("#AccountFrm_firstname").fill("Mohammad");
    await page.locator("#AccountFrm_lastname").fill("Alhijaa");
    await page.locator("#AccountFrm_email").fill(`mohammad${Date.now()}@example.com`);
    await page.locator("#AccountFrm_address_1").fill("Amman");
    await page.locator("#AccountFrm_city").fill("Amman");

    const countryDropdown = page.locator("#AccountFrm_country_id");
    const countryOptions = await countryDropdown.locator("option").all();
    const randomCountryIndex =
      Math.floor(Math.random() * (countryOptions.length - 1)) + 1;
    const randomCountryValue =
      await countryOptions[randomCountryIndex].getAttribute("value");

    await countryDropdown.selectOption(randomCountryValue!);

    const stateDropdown = page.locator("#AccountFrm_zone_id");
    await expect(stateDropdown.locator("option").nth(1)).toBeVisible();

    const stateOptions = await stateDropdown.locator("option").all();
    const randomStateIndex =Math.floor(Math.random() * (stateOptions.length - 1)) + 1;
    const randomStateValue =await stateOptions[randomStateIndex].getAttribute("value");

    await stateDropdown.selectOption(randomStateValue!);

    await page.locator("#AccountFrm_postcode").fill("12345");
    await page.locator("#AccountFrm_loginname").fill(`mohammad${Date.now()}`);
    await page.locator("#AccountFrm_password").fill("123456");
    await page.locator("#AccountFrm_confirm").fill("123456");

    await page.locator("#AccountFrm_newsletter1").check();
    await page.locator("#AccountFrm_agree").check();

    await page.locator('button[title="Continue"]').click();
  });
});
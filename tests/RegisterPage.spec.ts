import { test, expect } from '@playwright/test';

test.describe("Register Page > Happy Scenario", () => {
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
    const randomCountryIndex =Math.floor(Math.random() * (countryOptions.length - 1)) + 1;
    const randomCountryValue =await countryOptions[randomCountryIndex].getAttribute("value");
    await countryDropdown.selectOption(randomCountryValue!);
    const stateDropdown = page.locator("#AccountFrm_zone_id");
    const options = stateDropdown.locator("option");
    console.log("the number of option >>>"+await options.count());

    await expect(async () => {
      expect(await stateDropdown.locator("option").count()).toBeGreaterThan(1);
    }).toPass();

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

test.describe("", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://automationteststore.com/");
    await page.getByRole('link', { name: 'Login or register' }).click();
    await page.locator('button[title="Continue"]').click();
    await expect(page).toHaveURL(/account\/create/);
  });
  test("Verify user cannot register with empty data", async ({ page }) => {
    await page.locator('button[title="Continue"]').click();
    const errorMessage = await page.locator(".alert.alert-error.alert-danger").innerText();
    console.log(errorMessage);
  });
  test("Verify user cannot register without First name", async ({ page }) => {
    await page.locator("#AccountFrm_lastname").fill("Test");
    await page.locator("#AccountFrm_email").fill(`test${Date.now()}@mail.com`);
    await page.locator('button[title="Continue"]').click();
    await expect(page.locator("//span[normalize-space()='First Name must be between 1 and 32 characters!']"))
        .toHaveText("First Name must be between 1 and 32 characters!");
  });
  
  test("Verify user cannot register without Email", async ({ page }) => {
    await page.locator("#AccountFrm_firstname").fill("Mohammad");
    await page.locator("#AccountFrm_lastname").fill("Test");
    await page.locator('button[title="Continue"]').click();
    await expect(page.locator("//span[normalize-space()='Email Address does not appear to be valid!']"))
    .toHaveText("Email Address does not appear to be valid!");
  });
  test("Verify user cannot register without selecting region/state", async ({ page }) => {
    await page.locator("#AccountFrm_firstname").fill("Mohammad");
    await page.locator("#AccountFrm_lastname").fill("Alhijaa");
    await page.locator("#AccountFrm_email").fill(`mohammad${Date.now()}@example.com`);
    await page.locator("#AccountFrm_city").fill("Amman");
    await page.locator("#AccountFrm_postcode").fill("12345");
    await page.locator('button[title="Continue"]').click();
    await expect(page.locator("//span[normalize-space()='Please select a region / state!']"))
      .toHaveText("Please select a region / state!");
  });

  test("Verify user cannot register with invalid zip code", async ({ page }) => {
    await page.locator("#AccountFrm_postcode").fill("12");
    await page.locator('button[title="Continue"]').click();
    await expect(page.locator("//span[normalize-space()='Zip/postal code must be between 3 and 10 characters!']"))
      .toHaveText("Zip/postal code must be between 3 and 10 characters!");
  });

  test("Verify user cannot register with invalid login name", async ({ page }) => {
    await page.locator("#AccountFrm_loginname").fill("@@@");
    await page.locator('button[title="Continue"]').click();
    await expect(page.locator("//span[normalize-space()='Login name must be alphanumeric only and between 5 and 64 characters!']"))
      .toHaveText("Login name must be alphanumeric only and between 5 and 64 characters!");
  });

  test("Verify user cannot register with short password", async ({ page }) => {
    await page.locator("#AccountFrm_password").fill("123");
    await page.locator("#AccountFrm_confirm").fill("123");
    await page.locator('button[title="Continue"]').click();
    await expect(page.locator("//span[normalize-space()='Password must be between 4 and 20 characters!']"))
      .toHaveText("Password must be between 4 and 20 characters!");
  });
  test("Verify user cannot register with invalid city name", async ({ page }) => {
    await page.locator("#AccountFrm_city").fill("Am");
    await page.locator('button[title="Continue"]').click();
    await expect(page.locator("//span[normalize-space()='City must be between 3 and 128 characters!']"))
      .toHaveText("City must be between 3 and 128 characters!");
  });
  test("Verify user cant register without confirm", async ({ page }) => {
    await page.locator("#AccountFrm_firstname").fill("Mohammad");
    await page.locator("#AccountFrm_lastname").fill("Alhijaa");
    await page.locator("#AccountFrm_email").fill(`mohammad${Date.now()}@example.com`);
    await page.locator("#AccountFrm_address_1").fill("Amman");
    await page.locator("#AccountFrm_city").fill("Amman");
    const countryDropdown = page.locator("#AccountFrm_country_id");
    const countryOptions = await countryDropdown.locator("option").all();
    const randomCountryIndex =Math.floor(Math.random() * (countryOptions.length - 1)) + 1;
    const randomCountryValue =await countryOptions[randomCountryIndex].getAttribute("value");
    await countryDropdown.selectOption(randomCountryValue!);
    const stateDropdown = page.locator("#AccountFrm_zone_id");
    const options = stateDropdown.locator("option");
    console.log("the number of option >>>"+await options.count());

    await expect(async () => {
      expect(await stateDropdown.locator("option").count()).toBeGreaterThan(1);
    }).toPass();

    const stateOptions = await stateDropdown.locator("option").all();
    const randomStateIndex =Math.floor(Math.random() * (stateOptions.length - 1)) + 1;
    const randomStateValue =await stateOptions[randomStateIndex].getAttribute("value");
    await stateDropdown.selectOption(randomStateValue!);
    await page.locator("#AccountFrm_postcode").fill("12345");
    await page.locator("#AccountFrm_loginname").fill(`mohammad${Date.now()}`);
    await page.locator("#AccountFrm_password").fill("123456");
    await page.locator("#AccountFrm_confirm").fill("123456");
    await page.locator("#AccountFrm_newsletter0").uncheck();
    await page.locator("#AccountFrm_agree").check();
    await page.locator('button[title="Continue"]').click();
  });
});



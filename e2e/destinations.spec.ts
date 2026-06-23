import { test, expect } from '@playwright/test';

test.describe('Destinations page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/destinations');
  });

  test('should load and display destinations heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Destinations' }).first()
    ).toBeVisible();
  });

  test('should display destination count', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destinations-page')
      .nth(isMobile ? 1 : 0);
    await expect(
      container.getByText('15 destinations across 5 regions')
    ).toBeVisible();
  });

  test('should display category filters', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destinations-page')
      .nth(isMobile ? 1 : 0);
    await expect(container.getByText('Beach').first()).toBeVisible();
    await expect(container.getByText('City').first()).toBeVisible();
    await expect(container.getByText('Nature').first()).toBeVisible();
    await expect(container.getByText('Culture').first()).toBeVisible();
    await expect(container.getByText('Adventure').first()).toBeVisible();
  });

  test('should display region filters', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destinations-page')
      .nth(isMobile ? 1 : 0);
    await expect(container.getByText('Europe').first()).toBeVisible();
    await expect(container.getByText('Asia').first()).toBeVisible();
    await expect(container.getByText('Americas').first()).toBeVisible();
    await expect(container.getByText('Africa').first()).toBeVisible();
    await expect(container.getByText('Oceania').first()).toBeVisible();
  });

  test('should filter destinations by category', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Filter interaction tested on desktop only');
    const container = page.getByTestId('destinations-page').nth(0);
    await container.getByText('Beach').first().click();
    const cards = container.locator('a[href^="/destinations/"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to destination detail when card clicked', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destinations-page')
      .nth(isMobile ? 1 : 0);
    await container.locator('a[href^="/destinations/"]').first().click();
    await expect(page).toHaveURL(/\/destinations\/.+/);
  });

  test('should display destination cards with name and country', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destinations-page')
      .nth(isMobile ? 1 : 0);
    await expect(container.getByText('Tokyo').first()).toBeVisible();
    await expect(container.getByText('Japan').first()).toBeVisible();
  });
});

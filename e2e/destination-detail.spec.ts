import { test, expect } from '@playwright/test';

test.describe('Destination detail page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/destinations/tokyo');
  });

  test('should display destination name', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Tokyo' }).first()
    ).toBeVisible();
  });

  test('should display destination country', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destination-detail')
      .nth(isMobile ? 1 : 0);
    await expect(container.getByText('Japan').first()).toBeVisible();
  });

  test('should display destination description', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destination-detail')
      .nth(isMobile ? 1 : 0);
    await expect(
      container.getByText(/tokyo is a city of contrasts/i).first()
    ).toBeVisible();
  });

  test('should display quick stats', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destination-detail')
      .nth(isMobile ? 1 : 0);
    await expect(container.getByText('Best Time').first()).toBeVisible();
    await expect(container.getByText('Daily Cost').first()).toBeVisible();
    await expect(container.getByText('Language').first()).toBeVisible();
    await expect(container.getByText('Timezone').first()).toBeVisible();
  });

  test('should display highlights section', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destination-detail')
      .nth(isMobile ? 1 : 0);
    await expect(container.getByText('Highlights').first()).toBeVisible();
    await expect(container.getByText('Shibuya Crossing').first()).toBeVisible();
  });

  test('should display weather section', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destination-detail')
      .nth(isMobile ? 1 : 0);
    await expect(
      container.getByText('Current Weather').first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display map', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destination-detail')
      .nth(isMobile ? 1 : 0);
    await expect(
      container.locator('.leaflet-container').first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display hero image', async ({ page, isMobile }) => {
    const container = page
      .getByTestId('destination-detail')
      .nth(isMobile ? 1 : 0);
    await expect(
      container.locator('img[alt="Tokyo"]').first()
    ).toBeVisible();
  });

  test('should show not found state for unknown slug', async ({ page, isMobile }) => {
    await page.goto('/destinations/unknown-destination');
    await expect(
      page.getByText('This page could not be found').nth(isMobile ? 1 : 0)
    ).toBeVisible();
  });
});

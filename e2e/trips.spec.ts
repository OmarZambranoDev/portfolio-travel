import { test, expect } from '@playwright/test';

test.describe('Trips page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/trips');
  });

  test('should display page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Saved Trips' }).first()
    ).toBeVisible();
  });

  test('should display empty state when no trips saved', async ({ page, isMobile }) => {
    const container = page.getByTestId('trips-page').nth(isMobile ? 1 : 0);
    await expect(
      container.getByText('No saved trips yet')
    ).toBeVisible();
  });

  test('should display plan a trip button', async ({ page, isMobile }) => {
    const container = page.getByTestId('trips-page').nth(isMobile ? 1 : 0);
    await expect(
      container.getByRole('button', { name: /plan a trip/i }).first()
    ).toBeVisible();
  });

  test('should display plan a new trip link', async ({ page, isMobile }) => {
    const container = page.getByTestId('trips-page').nth(isMobile ? 1 : 0);
    await expect(
      container.getByRole('link', { name: /plan a new trip/i })
    ).toBeVisible();
  });

  test('should navigate to plan page from empty state', async ({ page, isMobile }) => {
    const container = page.getByTestId('trips-page').nth(isMobile ? 1 : 0);
    await container.getByRole('link', { name: /plan a new trip/i }).click();
    await expect(page).toHaveURL('/plan');
  });
});

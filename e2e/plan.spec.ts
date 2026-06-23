import { test, expect } from '@playwright/test';

test.describe('Plan page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/plan');
  });

  test('should display page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'AI Trip Planner' }).first()
    ).toBeVisible();
  });

  test('should display planner form', async ({ page, isMobile }) => {
    const container = page.getByTestId('planner-form').nth(isMobile ? 1 : 0);
    await expect(container).toBeVisible();
  });

  test('should display all form labels', async ({ page, isMobile }) => {
    const container = page.getByTestId('planner-form').nth(isMobile ? 1 : 0);
    await expect(container.locator('label', { hasText: 'Destination' })).toBeVisible();
    await expect(container.locator('label', { hasText: 'Duration' })).toBeVisible();
    await expect(container.locator('label', { hasText: 'Travel Style' })).toBeVisible();
    await expect(container.locator('label', { hasText: 'Budget' })).toBeVisible();
  });

  test('should display all travel style buttons', async ({ page, isMobile }) => {
    const container = page.getByTestId('planner-form').nth(isMobile ? 1 : 0);
    await expect(container.getByRole('button', { name: 'Adventure' })).toBeVisible();
    await expect(container.getByRole('button', { name: 'Cultural' })).toBeVisible();
    await expect(container.getByRole('button', { name: 'Relaxation' })).toBeVisible();
    await expect(container.getByRole('button', { name: 'Foodie' })).toBeVisible();
    await expect(container.getByRole('button', { name: 'Luxury' })).toBeVisible();
    await expect(container.getByRole('button', { name: 'Sports & Events' })).toBeVisible();
  });

  test('should have generate button disabled without destination', async ({ page, isMobile }) => {
    const container = page.getByTestId('planner-form').nth(isMobile ? 1 : 0);
    const button = container.getByRole('button', { name: /generate itinerary/i });
    await expect(button).toBeDisabled();
  });

  test('should display empty itinerary state', async ({ page, isMobile }) => {
    const container = page.getByTestId('planner-empty').nth(isMobile ? 1 : 0);
    await expect(
      container.getByText('Your itinerary will appear here')
    ).toBeVisible();
  });
});

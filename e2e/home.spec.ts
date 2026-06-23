import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load and display hero section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /your next adventure starts here/i })
    ).toBeVisible();
  });

  test('should display featured destinations', async ({ page, isMobile }) => {
    await expect(
      page.getByRole('heading', { name: 'Featured Destinations' }).first()
    ).toBeVisible();
    if (!isMobile) {
      const cards = page
        .getByTestId('featured-destinations')
        .first()
        .locator('a[href^="/destinations/"]');
      await expect(cards).toHaveCount(6, { timeout: 5000 });
    }
  });

  test('should display feature highlights', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Features section is hidden on mobile');
    const section = page.getByTestId('features-section').first();
    await expect(section.getByText('Explore Destinations')).toBeVisible();
    await expect(section.getByText('AI Trip Planner')).toBeVisible();
    await expect(section.getByText('Save Your Trips')).toBeVisible();
  });

  test('should navigate to destinations page', async ({ page }) => {
    await page.getByRole('link', { name: /explore destinations/i }).first().click();
    await expect(page).toHaveURL('/destinations');
  });

  test('should navigate to plan page', async ({ page }) => {
    await page.getByRole('link', { name: /plan with ai/i }).first().click();
    await expect(page).toHaveURL('/plan');
  });

  test('should navigate to destination detail when card clicked', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Featured destination cards are hidden on mobile');
    await page
      .getByTestId('featured-destinations')
      .first()
      .locator('a[href^="/destinations/"]')
      .first()
      .click();
    await expect(page).toHaveURL(/\/destinations\/.+/);
  });
});

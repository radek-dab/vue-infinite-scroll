import { test, expect } from '@playwright/test';

test('visits the character list', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('character-list')).toBeVisible();
});

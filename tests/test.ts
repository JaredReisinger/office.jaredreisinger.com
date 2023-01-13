import { expect, test } from '@playwright/test';

test('index page has expected title', async ({ page }) => {
  await page.goto('/');
  expect(await page.title()).toBe('Jared Reisinger’s Office!');
});

// test('index page has expected content', async ({ page }) => {
//   await page.goto('/');
//   expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
// });

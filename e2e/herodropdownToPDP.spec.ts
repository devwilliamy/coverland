import { test, expect } from '@playwright/test';

test('Selecting Car Covers 2020 BMW 3-Series, Expect to see 2019-2024 BMW 3-Series Car Cover', async ({
  page,
}) => {
  await page.goto('http:localhost:3000/');
  await page
    .getByRole('button', { name: '1' })
    .getByRole('combobox')
    .selectOption('Car Covers');
  await page
    .getByRole('button', { name: '2' })
    .getByRole('combobox')
    .selectOption('2016');
  await page
    .getByRole('button', { name: '3' })
    .getByRole('combobox')
    .selectOption('BMW');
  await page
    .getByRole('button', { name: '4' })
    .getByRole('combobox')
    .selectOption('3-Series');
  await expect(
    page.getByRole('button', { name: '5' }).getByRole('combobox')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Go' }).click();
  await expect(page.getByRole('main')).toContainText(
    '2006-2018 BMW 3-Series Car Cover'
  );
});

test('Selecting Truck Covers 2016 Ford F-150 Regular Cab 6.5 ft. Regular Bed can go to checkout', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/');
  await page
    .getByRole('button', { name: '1' })
    .getByRole('combobox')
    .selectOption('Truck Covers');
  await page
    .getByRole('button', { name: '2' })
    .getByRole('combobox')
    .selectOption('2016');
  await page
    .getByRole('button', { name: '3' })
    .getByRole('combobox')
    .selectOption('Ford');
  await page
    .getByRole('button', { name: '4' })
    .getByRole('combobox')
    .selectOption('F-150');
  await expect(
    page.getByRole('button', { name: '5' }).getByRole('combobox')
  ).toBeVisible();
  await page
    .getByRole('button', { name: '5' })
    .getByRole('combobox')
    .selectOption('Regular Cab');
  await page.getByRole('button', { name: 'Go' }).click();
  await page.goto(
    'http://localhost:3000/truck-covers/ford/f-150/2015-2024?submodel=regular+cab'
  );
  await expect(page.getByRole('main')).toContainText(
    '2015-2024 Ford F-150 Regular Cab'
  );
  await expect(page.getByRole('combobox')).toBeVisible();
  await expect(page.getByRole('combobox')).toContainText(
    'Select 2nd submodel6.5 ft. Regular Bed8.0 ft. Long Bed'
  );
  await page.getByRole('combobox').selectOption('6.5 ft. regular bed');
  await expect(page.getByRole('main')).toContainText(
    '2015-2024 Ford F-150 Regular Cab 6.5 ft. Regular Bed'
  );
  await page.getByRole('button', { name: 'Add To Cart' }).click();
  await page.getByRole('button', { name: 'View Cart (1)' }).click();
  await expect(page.locator('tbody')).toContainText(
    'Vehicle: Ford F-150 2015-2024'
  );
});

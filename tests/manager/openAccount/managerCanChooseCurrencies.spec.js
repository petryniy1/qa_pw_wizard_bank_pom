import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */

  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCurrencyFromDrop('Dollar');
  await openAccountPage.assertCurrencyValue('Dollar')
  await openAccountPage.selectCurrencyFromDrop('Pound')
  await openAccountPage.assertCurrencyValue('Pound');
  await openAccountPage.selectCurrencyFromDrop('Rupee');
  await openAccountPage.assertCurrencyValue('Rupee');
});

import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { generateCustomerData } from '../../../utils/customerFactory';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let customerData;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  const addCustPage = new AddCustomerPage(page);

  customerData = generateCustomerData();

  await addCustPage.open()
  await addCustPage.addCustomer(customerData);
  await addCustPage.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  const addCustPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const custListPage = new CustomersListPage(page);

  await addCustPage.clickOpenAccountButton();
  await openAccountPage.addAccountNumberToCustomerFromDrop(
    customerData, 'Dollar');
  await openAccountPage.reload();
  await openAccountPage.clickCustomersButton();
  await custListPage.assertLastCustomerParameters(customerData);
});

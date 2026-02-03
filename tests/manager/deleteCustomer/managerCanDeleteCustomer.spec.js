import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { generateCustomerData } from '../../../utils/customerFactory';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let customerData;

test.beforeEach(async ({ page }) => {

  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  const addCustPage = new AddCustomerPage(page);

  customerData = generateCustomerData();

  await addCustPage.open()
  await addCustPage.addCustomer(customerData);
});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */

  const custListPage = new CustomersListPage(page);

  await custListPage.open();
  await custListPage.deleteLastCustomer();
  await custListPage.assertCustomerIsAbsent(customerData);
  await custListPage.reload();
  await custListPage.assertCustomerIsAbsent(customerData);
});

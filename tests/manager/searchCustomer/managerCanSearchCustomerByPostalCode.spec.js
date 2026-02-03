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
  await addCustPage.reload();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Fill the postal code to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */

  const custListPage = new CustomersListPage(page);

  await custListPage.open();
  await custListPage.fillSearchField(customerData.postCode);
  await custListPage.assertCustomerFound(customerData.postCode);
});

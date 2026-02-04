import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersList = page.locator('tbody tr');
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertLastCustomerParameters({
    firstName,
    lastName,
    postCode
  }) {
    const lastCustomer = this.customersList.last();

    await expect(lastCustomer.locator('td').nth(0)).toHaveText(firstName);
    await expect(lastCustomer.locator('td').nth(1)).toHaveText(lastName);
    await expect(lastCustomer.locator('td').nth(2)).toHaveText(postCode);
  }

  async assertLastCustomerHasNoAccountNumber() {
    const lastCustomer = this.customersList.last();

    await expect(lastCustomer.locator('td').nth(3)).toHaveText('');
  }

  async assertCustomerHasAccountNumber(expectedNumber) {
    const lastCustomer = this.customersList.last();
    const accountCell = lastCustomer.locator('td').nth(3);

    await expect(accountCell).toHaveText(expectedNumber);
  }

  async deleteLastCustomer() {
    const lastCustomer = this.customersList.last();
    const deleteButton = lastCustomer.locator('button', { hasText: 'Delete' });

    await deleteButton.click();
  }

  async assertCustomerIsAbsent({ firstName, lastName, postCode }) {
    const customer = this.customersList
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .filter({ hasText: postCode });

    await expect(customer).toHaveCount(0);
  }

  async reload() {
    await this.page.reload();
  }

  async fillSearchField(value) {
    await this.searchField.fill(value);
  }

  async assertCustomerFound(value) {
    const customer = this.customersList.filter({ hasText: value });

    await expect(customer).toHaveCount(1);
  }
}



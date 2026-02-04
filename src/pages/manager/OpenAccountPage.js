import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDrop = page.locator('#currency');
    this.customersDrop = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerData) {
    const fullName = `${customerData.firstName} ${customerData.lastName}`;
    await this.customersDrop.selectOption({ label: fullName });
  }

  async selectCurrencyFromDrop(currencyName) {
    await this.currencyDrop.selectOption({ label: currencyName });
  }

  async assertCurrencyValue(currencyName) {
    await expect(this.currencyDrop.locator('option:checked')).toHaveText(currencyName);
  }

  async addAccountNumberToCustomerFromDrop(customerData, currencyName) {
    await this.selectCustomer(customerData);
    await this.selectCurrencyFromDrop(currencyName);
    await this.processButton.click();
  }

  async processAndGetAccountNumber() {
    return new Promise(resolve => {
      this.page.once('dialog', async dialog => {
        const message = dialog.message();
        const match = message.match(/\d+/);
        const accountNumber = match ? match[0] : null;
        await dialog.accept();
        resolve(accountNumber);
      });
      this.processButton.click();
    });
  }

  async createAccountAndGetNumber(customerData, currencyName) {
    await this.selectCustomer(customerData);
    await this.selectCurrencyFromDrop(currencyName);
    return await this.processAndGetAccountNumber();
  }

  async reload() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}

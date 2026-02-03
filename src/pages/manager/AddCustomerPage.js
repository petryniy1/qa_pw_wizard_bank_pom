import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page
      .getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page
      .getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button',
      { name: 'Open Account' });
    this.lastAlertMessage = null;
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async handleAlert() {
    this.page.once('dialog', async dialog => {
      this.lastAlertMessage = dialog.message();
      await dialog.accept();
    });
  }

  async addFakeCustomer({ firstName, lastName, postCode }) {
    await this.handleAlert();

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postCode.fill(postCode);

    await this.addCustomerButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async reload() {
    await this.page.reload();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async isFieldValid(fieldLocator) {
    return await fieldLocator.evaluate(function (el) {
      return el.checkValidity();
    });
  }

  async expectFieldInvalid(fieldLocator) {
    const valid = await this.isFieldValid(fieldLocator);
    expect(valid).toBe(false);
  }
}

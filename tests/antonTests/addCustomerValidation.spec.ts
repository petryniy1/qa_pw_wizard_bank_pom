import { expect, test } from '@playwright/test';
import { AddCustomerPage } from '../../src/pages/manager/AddCustomerPage';

test('Should show validation error for empty required fields',
    async ({ page }) => {
        const addCustPage = new AddCustomerPage(page);

        await addCustPage.open()
        await addCustPage.addFakeCustomer(
            {
                firstName: '',
                lastName: 'Granger',
                postCode: 'E859AB'
            });

        await addCustPage.expectFieldInvalid(addCustPage.firstName);
        await addCustPage.addFakeCustomer(
            {
                firstName: 'Hermoine',
                lastName: '',
                postCode: 'E859AB'
            });
        await addCustPage.expectFieldInvalid(addCustPage.lastName);
        await addCustPage.addFakeCustomer(
            {
                firstName: 'Hermoine',
                lastName: 'Granger',
                postCode: 'E859AB'
            });
        await addCustPage.expectFieldInvalid(addCustPage.postCode);

    });

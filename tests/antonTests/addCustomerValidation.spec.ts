import { expect, test } from '@playwright/test';
import { AddCustomerPage } from '../../src/pages/manager/AddCustomerPage';

test('Should show validation error for empty required fields',
    async ({ page }) => {
        const addCustPage = new AddCustomerPage(page);

        await addCustPage.open()
        await addCustPage.addCustomer(
            {
                firstName: '',
                lastName: 'Granger',
                postCode: 'E859AB'
            });

        await addCustPage.expectFieldInvalid(addCustPage.firstName);
        await addCustPage.addCustomer(
            {
                firstName: 'Hermoine',
                lastName: '',
                postCode: 'E859AB'
            });
        await addCustPage.expectFieldInvalid(addCustPage.lastName);
        await addCustPage.addCustomer(
            {
                firstName: 'Hermoine',
                lastName: 'Granger',
                postCode: ''
            });
        await addCustPage.expectFieldInvalid(addCustPage.postCode);

    });

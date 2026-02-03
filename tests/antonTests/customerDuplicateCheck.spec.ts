import { expect, test } from '@playwright/test';
import { AddCustomerPage } from '../../src/pages/manager/AddCustomerPage';

test('Should show alert when adding duplicate customer',
    async ({ page }) => {
        const addCustPage = new AddCustomerPage(page);

        await addCustPage.open()

        await addCustPage.addFakeCustomer(
            {
                firstName: 'Hermoine',
                lastName: 'Granger',
                postCode: 'E859AB'
            });
        
        expect(addCustPage.lastAlertMessage)
            .toContain('Customer may be duplicate');
    });

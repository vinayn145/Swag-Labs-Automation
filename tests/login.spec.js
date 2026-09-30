const { test, expect }= require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const testData = require('../utils/testData');

test(' Valid login', async({page}) => {
    const loginPage= new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.navigate();

    await loginPage.login(testData.validUser.username, 
        testData.validUser.password
    );

    await expect(productsPage.pageTitle).toBeVisible();

    await expect(page).toHaveURL(/inventory.html/);
});
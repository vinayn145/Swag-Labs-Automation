const {test, expect} = require('@playwright/test');

test('SauseDemo Login', async({page}) =>{
   //Regular syntax
//    await page.goto("https://www.saucedemo.com/");
//    await page.locator('#user-name').fill('standard_user');
//    await page.locator('#password').fill('secret_sauce');
//    await page.locator('#login-button').click();
//      // 5. Verify Products page is displayed
//    await expect(page.locator('.title')).toHaveText('Products');
//     // 6. Verify page title
//    await expect(page).toHaveTitle('Swag labs');
//     // 7. Verify at least one product is visible
//     await expect(page.locator('.inventory_item').first()).toBeVisible();


    //Playwright syntax
    // Navigate
    await page.goto("https://www.saucedemo.com/");

    // Username
     await page.getByRole('textbox', {name:'Username'}).fill('standard_user');

    // Password
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce');

    // Login
    await page.getByRole('button', { name : 'Login'}).click();

    // Verify Products
    await expect(page.getByText('Products', {exact: true})).toBeVisible();

    // Verify title
    await expect(page).toHaveTitle('Swag Labs');

    // Verify product
    await expect(page.locator('.inventory_item').first()).toBeVisible();

});
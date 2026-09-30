const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const testData = require('../utils/testData');

test.describe('Products Tests', () =>{
    let loginPage;
    let productsPage;

    test.beforeEach(async ({ page }) =>{
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

        await loginPage.navigate();
        
        await loginPage.login(testData.validUser.username, testData.validUser.password);

    });

    test('Verify product count', async() =>{
        const count=await productsPage.getProductCount();

        expect(count).toBe(6);
    });

    test('Print product names', async() =>{
        const products=await productsPage.getProductNames();
        console.log(products);
        expect(products.length).toBe(6);
    });

    test('verify first, third and last products', async() =>{
        
        const first= await productsPage.getFirstProductName();
        const third= await productsPage.getThirdProductName();
        const last= await productsPage.getLastProductName();
        
        console.log('First:', first);
        console.log('Third:', third);
        console.log('Last:', last);

        expect(first).toBe('Sauce Labs Backpack');

        expect(third).toBe('Sauce Labs Bolt T-Shirt');
    });

    test('Sort products from low to high', async() => {
        await productsPage.sortProducts('lohi');

        const products = await productsPage.getProductNames();

        console.log('Sorted products:', products);

        expect(products).toHaveLength(6);

        expect(products[0]).toBe('Sauce Labs Onesie');

        expect(products[5]).toBe('Sauce Labs Fleece Jacket');
    });

    test('verify Bolt T-shirt description', async() => {
        const description = await productsPage.getProductDescription(testData.products.boltTShirt);

        expect(description).toBeTruthy();
    });

    test('Add Bolt T-shirt to cart', async () =>{
         await productsPage.addProductToCart(testData.products.boltTShirt);

         const badge= await productsPage.getCartBadgeCount();

         expect(badge).toBe('1');
    });;

});
const { test, expect} = require('@playwright/test');

const LoginPage= require('../pages/LoginPage');
const ProductsPage= require('../pages/ProductsPage');
const CartPage= require('../pages/CartPage');
const testData= require('../utils/testData');

test('Add two products and remove one product', async({page}) => {
     
     // Create Page Objects
    const loginPage=new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.navigate();

    await loginPage.login(testData.validUser.username,
        testData.validUser.password
    );

    await expect(productsPage.pageTitle).toBeVisible();

    // Add Product 1
    await productsPage.addProductToCart(testData.products.backpack);

    //Add Product 2
    await productsPage.addProductToCart(testData.products.boltTShirt);

    //Verify Cart Badge
    const badge= await productsPage.getCartBadgeCount();
    expect(badge).toBe('2');

    //Open cart
    await productsPage.openCart();

    //Verify Cart count
    const cartCount= await cartPage.getCartItemCount();
    expect(cartCount).toBe(2);

    //Verify products
    const cartProducts= await cartPage.getCartItemNames();
    console.log('Cart Products:', cartProducts);

    expect(cartProducts).toContain(testData.products.backpack);
    expect(cartProducts).toContain(testData.products.boltTShirt);

    // Remove backpack
    await cartPage.removeProduct(testData.products.backpack);

    //Verify one product remains
    const finalcount= await cartPage.getCartItemCount();
    expect(finalcount).toBe(1);

    // Verify remaing product
    const remainingProducts= await cartPage.getCartItemNames();
    expect(remainingProducts).toEqual([testData.products.boltTShirt]);

    //Verify quantity
    const quantity= await cartPage.getQuantity();
    expect(quantity).toBe('1');
});

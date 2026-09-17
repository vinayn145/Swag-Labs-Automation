const {test, expect} =require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

test('Product filtering and cart operations', async ({page}) =>{

    //Create Page objects
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // 1. Login
    await loginPage.navigate();

    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Verify products page
    await expect(page.locator('.title')).toHaveText('Products');

    // 3. Get and print all product names
    const products=await productsPage.getProductNames();

    console.log(products);

    // 4. SELECT PRICE/FILTER OPTION
    await productsPage.selectFilter('lohi');

    // 5. Verify Displayed products
    const displayedProducts= await productsPage.getDisplayProducts();

    console.log('Products after filtering:');
    console.log(displayedProducts);

    // Verify quantity
    await expect(productsPage.productNames).toHaveCount(6);

    // Add product to cart
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    // Open cart
    await productsPage.openCart();

    // Verify Product name
    await expect(cartPage.cartItemNames).toHaveText('Sauce Labs Bolt T-Shirt');
    
    //Verify Quantity
    await expect(cartPage.quantity).toHaveText('1');

    //Remove Product
    await cartPage.removeProduct();

    //Verify Cart is empty
    await expect(cartPage.cartItems).toHaveCount(0);

});

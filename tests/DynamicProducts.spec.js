const {test, expect}=require('@playwright/test');

const LoginPage=require('../pages/LoginPage');
const ProductsPage=require('../pages/ProductsPage');
const CartPage=require('../pages/CartPage');

test('Dynamic product locator exercise', async({page}) =>{
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    //1 Login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    //2 Product Count
    const productCount=await productsPage.getProductCount();
    console.log('Product count:', productCount);

    expect(productCount).toBe(6);

    //4 First Product
    const firstProduct=await productsPage.getFirstProductName();
    console.log('First Product: ', firstProduct);

    //5 Last Product
    const lastProduct=await productsPage.getLastProductName();
    console.log('Last Product: ', lastProduct);

    //6 Third Product
    const thirdProduct=await productsPage.getThirdProductName();
    console.log('Third Product: ', thirdProduct);

    //7 Find specific Product
    const product =await productsPage.getProductByName('Sauce Labs Bolt T-Shirt');
    await expect(product).toHaveCount(1);

    //8 Get product details
    const productName= await product.locator('.inventory_item_name').innerText();

    const productPrice= await product.locator('.inventory_item_price').innerText();

    const productDescription=await product.locator('.inventory_item_desc').innerText();

    console.log('Product: ', productName);
    console.log('Price: ', productPrice);
    console.log('Description: ', productDescription);

    //9 Verify Product Details
    await expect(product.locator('.inventory_item_name')).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(product.locator('.inventory_item_price')).toHaveText('$15.99');
    await expect(product.getByRole('button', {name: 'Add to cart'})).toBeVisible();

    // 10 Add product
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    //11 Verify Cart Badge
    await expect(productsPage.cartBadge).toHaveText('1');

    //12 Open cart
    await productsPage.openCart();

    //13 Verify one cart Item
    await expect(cartPage.cartItems).toHaveCount(1);

    //14 Verify name and price
    await expect(cartPage.cartItemNames).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(cartPage.cartItemPrice).toHaveText('$15.99');

    //15 Remove
    await cartPage.removeProduct();

    //16 Verify empty list
    await expect(cartPage.cartItems).toHaveCount(0);





    

})

class ProductsPage {
    constructor(page) {
        this.page = page;

        // page locators
        this.productNames = page.locator('.inventory_item_name');
        this.productItems = page.locator('.inventory_item');
        this.productPrices = page.locator('.inventory_item_price');

        this.sortDropdown = page.locator('.product_sort_container');
        this.cartButton = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    //Get all product names
    async getProductNames() {
        const products = await this.productNames.allTextContents();

        console.log('Product Names:');

        for (const product of products) {
            console.log(product);
        }
        return products;
    }

    //Select a price/filter option
    async selectFilter(option) {
        await this.sortDropdown.selectOption(option);
    }

    async getDisplayProducts(option) {
        return await this.productNames.allTextContents();
    }

    /*   Dynamic Products methods  ---------------------------------------------------------------------*/

    async getProductCount() {
        return await this.productItems.count();
    }

    async getFirstProductName() {
        return await this.productItems.first()
            .locator('.inventory_item_name').innerText();
    }

    async getLastProductName() {
        return await this.productItems.last()
            .locator('.inventory_item_name').innerText();
    }

    //ThirdProductName
    async getThirdProductName(){
        return await this.productItems.nth(2)
        .locator('.inventory_item_name')
        .innerText();
    }

    async getProductByName(productName){
        return await this.productItems.filter({ hasText: productName });
    }

    async getProductPrice(productName){
        const product = await this.getProductByName(productName);

        return await product.locator('.inventory_item_price').innerText();
    }

      async getProductDescription(productName){
        const product = await this.getProductByName(productName);

        return await product.locator('.inventory_item_desc').innerText();
    }
    //Add product to cart
    async addProductToCart(productName) {
        const product = await this.getProductByName(productName);

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart() {
        await this.cartButton.click();
    }

    async getCartBadgeCount(){
        return await this.cartBadge.innerText();
    }
}
module.exports = ProductsPage;
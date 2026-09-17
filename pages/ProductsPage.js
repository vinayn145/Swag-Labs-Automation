class ProductsPage {
    constructor(page) {
        this.page = page;

        // page locators
        this.productNames = page.locator('.inventory_item_name');
        this.productItems = page.locator('.inventory_item');

        this.sortDropdown = page.locator('.product_sort_container');
        this.cartButton = page.locator('.shopping_cart_link');
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

    //Add product to cart
    async addProductToCart(productName) {
        const product = this.page.locator('.inventory_item')
            .filter({ hasText: productName });

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart() {
        await this.cartButton.click();
    }
}
module.exports = ProductsPage;
class CartPage {
    constructor(page) {
        this.page = page;
        //All cart product cards
        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = page.locator('.cart_item .inventory_item_name');
        this.cartItemPrice = page.locator('.cart_item .inventory_item_price');
        this.quantity = page.locator('.cart_quantity');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.removeButton = page.getByRole('button', { name: 'Remove' });
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async getCartItemNames() {
        return await this.cartItemNames.allTextContents();
    }

    async getCartItemPrice() {
        return await this.cartItemPrice.first.innerText();
    }
    // Verify product name
    async getProductName() {
        return await this.cartItemNames.innerText();
    }

    //Verify quantity
    async getQuantity() {
        return await this.quantity.first().innerText();
    }

    // Verify Remove Product
    async removeProduct(productName) {
        const product = this.cartItems.filter({ hasText: productName });

        await product .getByRole('button', {
                name: 'Remove'
            }).click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}

module.exports = CartPage;
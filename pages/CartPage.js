class CartPage{
    constructor(page){
        this.page =page;

        this.cartItems=page.locator('.cart_item');
        this.cartItemNames= page.locator('.cart_item .inventory_item_name');
        this.quantity= page.locator('.cart_quantity');

        this.removeButton= page.getByRole('button', {name: 'Remove'});
    }
    
    // Verify product name
    async getProductName(){
        return await this.cartItemNames.innerText();
    }

    //Verify quantity
    async getQuantity(){
        return await this.quantity.innerText();
    }

    // Verify Remove Product
    async removeProduct(){
        await this.removeButton.click();
    }
}
module.exports = CartPage;
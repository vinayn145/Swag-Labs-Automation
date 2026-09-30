class LoginPage{
    constructor(page){
        this.page=page;

        //Locators
        this.username= page.getByRole('textbox', {name:'Username'});
        this.password=page.getByRole('textbox', {name:'Password'});
        this.loginButton=page.getByRole('button', {name: 'Login'});
        this.errorMessage = page.locator('[data-test="error"]');

    }

    async navigate(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(){
        return await this.errorMessage.innerText();
    }
}  

module.exports = LoginPage;
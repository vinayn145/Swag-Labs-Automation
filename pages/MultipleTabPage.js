class MultipleTabPage {
    constructor(page) {
        this.page = page;

        this.newTabLink = page.getByRole('link', { name: 'Open new tab' });
    }

    async openNewTab() {
        //Start waiting for popup BEFORE clicking
        const pagePromise = this.page.waitForEvent('popup');

        await this.newTabLink.click();

        // Capture the newly opened page
        const newPage = await pagePromise;

        return newPage;
    }
}

module.exports = MultipleTabPage;
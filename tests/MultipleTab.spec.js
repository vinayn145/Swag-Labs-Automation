const { test, expect } = require('@playwright/test');

test('Handle multiple tabs', async ({ page }) => {
   //1. Open original page
   await page.goto('https://www.google.com');

   await page.pause();

   //2. Create a popup/new tab using JavaScript
   const pagePrmoise = page.waitForEvent('popup');

   await page.evaluate(() => {
      window.open('https://example.com', '_blank');
   });

   // 3. Capture popup
   const newPage = await pagePrmoise;

   // Wait for the new page to load
   await newPage.waitForLoadState();

   await page.pause();   // 👈 observe original page
   await newPage.bringToFront();
   await newPage.pause(); // 👈 observe new tab

   // 4. Verify new page URL
   await expect(newPage).toHaveURL('https://example.com/');

   // 5. Verify heading on new page
   await expect(newPage.getByRole('heading', { name: 'Example Domain' })).toBeVisible();

   // 6. Close popup
   await newPage.close();


    await page.pause(); 
    
   // 7. Continue working with original page
   await expect(page).toHaveURL('https://www.google.com/');
});
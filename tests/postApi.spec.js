const {test, expect } = require('@playwright/test');

test('POST create a new post', async({request}) =>{
     
    //Request body
    const requestBody={
        title: 'Playwright',
        body: 'API testing',
        userId:1
    };

    // Send POST request
    const response= await request.post('https://jsonplaceholder.typicode.com/posts', { data: requestBody});

    // Verify status
    expect(response.status()).toBe(201);
    
    // Convert response to JSON
    const responseBody = await response.json();
    console.log('Response: ', responseBody);

    // Verify response body
    expect(responseBody).toBeTruthy();

    // Verify title
    expect(responseBody.title).toBe('Playwright');

    //Verify body
    expect(responseBody.body).toBe('API testing');

    // Verify userId
    expect(responseBody.userId).toBe(1);



});
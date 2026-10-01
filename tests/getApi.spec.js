const {test, expect } = require('@playwright/test');

test('GET users API', async({request }) =>{
    //Send api request
    const response= await request.get('https://jsonplaceholder.typicode.com/users');

    // 1. Verify HTTP status
    expect(response.status()).toBe(200);

    //2.Convert response body to JSON
    const users= await response.json();

    //3. Verify response is an array
    expect(Array.isArray(users)).toBe(true);

    //4. Verify at least one user exists
    expect(users.length).toBeGreaterThan(0);

    //5.Get first user
    const firstUser = users[0];
    console.log('First user: ',firstUser);

    //6.Verify first user's name isn't empty
    expect(firstUser.name).not.toBe('');

    //7.Verify first user's email contains @
    expect(firstUser.email).toContain('@');




     
});
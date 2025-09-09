import { test, expect } from '@playwright/test';

test('POST API Test with static data', async ({ request }) => {
    //creating a new booking POST request
    const response = await request.post('/booking', {
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    });

    const responseBody = await response.json();
    //checking status code and status text
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //checking response body
    expect(responseBody).toHaveProperty('bookingid', expect.any(Number));
    expect(responseBody.booking).toHaveProperty( "firstname","Jim");
});
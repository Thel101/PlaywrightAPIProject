import {test, expect} from '@playwright/test';
const jsonBookingData = require('../test-data/new-booking.json');
test('POST API Test with static data', async ({request}) => {
    //creating a new booking POST request
    const staticData = await request.post('/booking', {
        data: jsonBookingData
    });

   const responseBody = await staticData.json();
   //checking status code and status text
   expect(staticData.ok()).toBeTruthy();
   expect(staticData.status()).toBe(200);
    //checking response body
    expect(responseBody).toHaveProperty('bookingid', expect.any(Number));
});
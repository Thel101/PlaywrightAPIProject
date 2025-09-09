import {test, expect} from '@playwright/test';

import {faker} from '@faker-js/faker';
import {DateTime} from 'luxon'

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const totalPrice = faker.number.int({min: 50, max: 5000});
const checkinDate = DateTime.now().toFormat('yyyy-MM-dd');
const checkoutDate = DateTime.now().plus({days: 5}).toFormat('yyyy-MM-dd');

test('POST API Test with dynamic data', async ({request}) => {
    //creating a new booking POST request
    const staticData = await request.post('/booking', {
        data: {
            firstname: firstName,
            lastname: lastName,
            totalprice: totalPrice,
            depositpaid: true,
            bookingdates: {
                checkin: checkinDate,
                checkout: checkoutDate
            },
            additionalneeds: "Breakfast"
        }
    });

   const responseBody = await staticData.json();
   //checking status code and status text
   expect(staticData.ok()).toBeTruthy();
   expect(staticData.status()).toBe(200);
    //checking response body
    expect(responseBody).toHaveProperty('bookingid', expect.any(Number));
});
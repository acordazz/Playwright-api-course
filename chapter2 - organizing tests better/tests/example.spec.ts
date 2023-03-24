import { test, expect } from '@playwright/test';


test.describe("Using common setup", () => {
  let bookingForBeforeAll: number;
  let bookingForBeforeEach: number;
  const seedNumber = Math.floor(Date.now() / 1000).toString();

  test.beforeAll(async ({ request }) => {
    let response = await request.post(
      "https://restful-booker.herokuapp.com/booking",
      {
        data: {
          firstname: "Mary Jane",
          lastname: `Watson${seedNumber}`,
          totalprice: 120,
          depositpaid: true,
          bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01",
          },
          additionalneeds: "Breakfast",
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    expect(response.status(), "testing whether status is 200").toBe(200);
    const BodyPost = await response.json();
    bookingForBeforeAll = BodyPost.bookingid;
    console.log(`Booking for beforeAll: ${bookingForBeforeAll}`);
  });

  test.beforeEach(async ({ request }) => {
    let response = await request.post(
      "https://restful-booker.herokuapp.com/booking",
      {
        data: {
          firstname: "Peter",
          lastname: `Parker${seedNumber}`,
          totalprice: 130,
          depositpaid: true,
          bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01",
          },
          additionalneeds: "Flies",
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    expect(response.status(), "testing whether status is 200").toBe(200);
    const BodyPost = await response.json();
    bookingForBeforeEach = BodyPost.bookingid;
    console.log(`Booking for beforeEach: ${bookingForBeforeEach}`);
  });

  test.afterEach(async ({ request }) => {
    const responseDel = await request.delete(
      `https://restful-booker.herokuapp.com/booking/${bookingForBeforeEach}`,
      {
        headers: {
          // 'Cookie': `token=${Token}`
          Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
        },
      }
    );

    expect(
      responseDel.status(),
      "testing whether status is 201 (means it was successfully deleted)."
    ).toBe(201);
  });

  test.afterAll(async ({ request }) => {
    const responseDel = await request.delete(
      `https://restful-booker.herokuapp.com/booking/${bookingForBeforeAll}`,
      {
        headers: {
          // 'Cookie': `token=${Token}`
          Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
        },
      }
    );

    expect(
      responseDel.status(),
      "testing whether status is 201 (means it was successfully deleted)."
    ).toBe(201);
  });

  test("Search for a booking and if it is found, delete another one", async ({
    request,
  }) => {
    const responseFirstBooking = await request.get(
      `https://restful-booker.herokuapp.com/booking`,
      {
        params: {
          firstname: "Mary Jane",
          lastname: `Watson${seedNumber}`,
        },
      }
    );

    expect(responseFirstBooking.status(), "testing whether status is 200").toBe(
      200
    );
    const BodyFirstPost: any[] = await responseFirstBooking.json();
    const BookingIdFirst = BodyFirstPost[0].bookingid;
    console.log(`First booking: ${BookingIdFirst}`);

    const responseSecondBooking = await request.get(
      `https://restful-booker.herokuapp.com/booking`,
      {
        params: {
          firstname: "Peter",
          lastname: `Parker${seedNumber}`,
        },
      }
    );

    expect(
      responseSecondBooking.status(),
      "testing whether status is 200"
    ).toBe(200);
    const BodySecondPost: any[] = await responseSecondBooking.json();
    const BookingIdSecond = BodySecondPost[0].bookingid;
    console.log(`First booking: ${BookingIdSecond}`);
  });
});

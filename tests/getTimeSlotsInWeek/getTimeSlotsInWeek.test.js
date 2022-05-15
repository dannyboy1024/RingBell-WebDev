const test_db = require('../../test-helper/test_db')
const { getTimeSlotsInWeek } = require("../../controllers/listeners")
const { createListener, createListeners } = require("../../controllers/listeners")
const testsData = require("./getTimeSlotsInWeek.test.json")
const request = require("supertest");
const baseLocalURL = 'localhost:5002/api/v1/'
const mongoose = require('mongoose');



describe("GET /getTimeSlotsInWeek", () => {

    beforeAll(async () => {
        await request(baseLocalURL).post('dev/reset-db-state');
    })


    testsData.map(test => {
        it(test.testName, async () => {
            const response = await request(baseLocalURL).get(test.route);

            expect(response.statusCode).toBe(test.expectedStatusCode);
            expect(response.body.data).toMatchObject(test.expectedResponse);
        })

    })
})


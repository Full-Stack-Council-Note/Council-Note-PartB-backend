const {app} = require('../server')
const mongoose = require("mongoose")
const request = require("supertest")
require("dotenv").config();


describe("GET /", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        
            useUnifiedTopology: true,
        })
    })
    
    beforeEach(async () => {
        jest.setTimeout(100000)
    })
    
    it("should return CouncilNote successfully", async () => {
        return request(app)
            .get("/")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
    afterAll(async () => {
        mongoose.disconnect()
    })
});
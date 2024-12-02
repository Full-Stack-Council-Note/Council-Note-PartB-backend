const {app} = require('../server')
const mongoose = require("mongoose")
const request = require("supertest")
require("dotenv").config();
//const router = express.Router();

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI)

        NoticeTitle= 'Test Notice title'
        NoticeDescription = 'updated notice description'
        
    })

    beforeEach(async () => {
        jest.setTimeout(100000)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
    
    test('Notice post is added', async () => {
        await request(app).post('/notices').send( NoticeTitle,NoticeDescription)
        .expect('Content-Type', /json/)
        .expect(200)
    })


    test('Notice post by ID is received', async () => {

        await request(app)
        .get("/notices/:id'")
        .expect('Content-Type', /json/)
        .expect(200)
    })

    test('Notice post is updated', async () => {
        return request(app)
        .put("/notices/:id'").send(NoticeDescription)
        .expect('Content-Type', /json/)
        .expect(200)
    })

    test('Notice post is deleted', async () => {
        return request(app)
        .delete("/notices/:id'")  
        
    })
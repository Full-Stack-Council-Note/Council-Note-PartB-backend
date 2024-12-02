const {app} = require('../server')
const mongoose = require("mongoose")
const request = require("supertest")
require("dotenv").config();
//const router = express.Router();


    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI)

        NoticeTitle= 'Test Notice title'
        NoticeDescription = 'test notice description'
        
    })

    beforeEach(async () => {
        jest.setTimeout(100000)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
    
    test('Notice post is added', async () => {
        const response = await request(app).post('/notices').send( NoticeTitle,NoticeDescription)
  
    })
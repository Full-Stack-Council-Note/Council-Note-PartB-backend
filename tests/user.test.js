const {app} = require('../server')
const mongoose = require("mongoose")
const request = require("supertest")
require("dotenv").config();
//const router = express.Router();

//const {User} = require("../models/userModel");
//app.use(express.json());


    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI)

        fullname= 'Robert Bailey'
        email = 'RBailey@email.com'
        password= 'CNtest123'

    })

    beforeEach(async () => {
        jest.setTimeout(100000)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('User is registered', async () => {
        const response = await request(app).post('/auth/register').send(fullname,email,password)
    
        //expect(response.status).toBe(200)
        //expect(response.body.user.email).toBe('RBailey@email.com')
    })
    
    test('User is logged in', async () => {
        const response = await request(app).post('/auth/login').send(email,password)
    
        //expect(response.status).toBe(200)
        //expect(response.body.user.email).toBe('RBailey@email.com')
    })


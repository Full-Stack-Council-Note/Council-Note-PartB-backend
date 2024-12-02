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
        about='I am the founder of CouncilNote'
    })

    beforeEach(async () => {
        jest.setTimeout(100000)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('User is registered', async () => {
        await request(app).post('/auth/register').send(fullname,email,password)
        .expect('Content-Type', /json/)

    })
    
    test('User is logged in', async () => {
        await request(app).post('/auth/login').send(email,password)
        .expect('Content-Type', /json/)

    })

    test('User by ID is received', async () => {

        await request(app)
        .get('/users/:id')
        .expect('Content-Type', /json/)

    })

    test('User is updated', async () => {
        return request(app)
        .patch('/users/:id').send(about)
        .expect('Content-Type', /json/)

    })


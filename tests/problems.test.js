const {app} = require('../server')
const mongoose = require("mongoose")
const request = require("supertest")
require("dotenv").config();
//const router = express.Router();
//const { getAllProblems, addProblem } = require('../controllers/ProblemCtrl');
const {User} = require("../models/userModel");
//app.use(express.json());

//const ProblemsRouter = require('../routes/Problems');
//app.use('/problems', ProblemsRouter);



    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI)

        email = 'RBailey@email.com'

        // await getAllProblems()
    })

    beforeEach(async () => {
        jest.setTimeout(100000)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
    
    test('User is registered', async () => {
        const response = await request(app).post('/auth/register').send({
            fullname: 'Robert Bailey',
            email: 'RBailey@email.com',
            password: 'CNtest123'
            
        })
    
        expect(response.status).toBe(200)
        expect(response.body.user.email).toBe('RBailey@email.com')
    })

    test('User can login with valid details', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'RBailey@email.com',
            password: 'CNtest123'
        })
    
        //const jwt = response.body

        expect(response.status).toBe(200)
        //expect(response.body).toBe(jwt)
    })



 


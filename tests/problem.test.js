const {app} = require('../server')
const mongoose = require("mongoose")
const request = require("supertest")
require("dotenv").config();
//const router = express.Router();
//const { getAllProblems, addProblem } = require('../controllers/ProblemCtrl');


    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI)

        problemtitle= 'Test Problem title'
        problemdescription = 'test description'
        

        // await getAllProblems()
    })

    beforeEach(async () => {
        jest.setTimeout(100000)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
    
    test('Problem post is added', async () => {
        const response = await request(app).post('/problems').send( problemtitle,problemdescription)
    
  
    })
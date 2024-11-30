const {app} = require('../server')
const mongoose = require("mongoose")
const request = require("supertest")
//const router = express.Router();
const { getProblemById } = require('../controllers/ProblemCtrl');
const Problem = require("../models/problemModel");
require("dotenv").config();


    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        
            useUnifiedTopology: true,
        })
    })

    beforeEach(async () => {
        jest.setTimeout(100000)
    })
    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('Problem gets created', async () => {
        jest.setTimeout(100000)
        //const problemPost = new Problem(ProblemTitle);
        const response = await request(app).get('/:problemId/').send(
            "Test Problem, Test description"
            )
    
        //.expect(201)
        
        await expect(response.statusCode).toEqual(200);
                                         //toStrictEqual
        await expect(response.body).toBe("Test Problem, Test description");
    
     
    })



 


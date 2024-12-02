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
        UrgentOrSoon='Urgent'

        // await getAllProblems()
    })

    beforeEach(async () => {
        jest.setTimeout(100000)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
    
    test('Problem post is added', async () => {
        await request(app).post('/problems').send( problemtitle,problemdescription)
        .expect('Content-Type', /json/)
        .then((res) => {
            expect(res.statusCode).toBe(201);
        })
    })

    test('Problem post by ID is received', async () => {

        return request(app)
        .get('/problems/:id')
        .expect('Content-Type', /json/)
    })

    test('Problem post is updated', async () => {
        return request(app)
        .put('/problems/:id').send(UrgentOrSoon)
        .expect('Content-Type', /json/)
        .expect(200)
    })

    test('Problem post is deleted', async () => {
        return request(app)
        .delete('/problems/:id')  
        
    })
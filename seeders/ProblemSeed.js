const mongoose = require("mongoose")
require('dotenv').config();
const {app} = require('../server')
const {Problem,ProblemComment} = require("../models/problemModel");
const { User } = require("../models/userModel")

let users = [
    {
    fullname:"John Smith",
    email: 'john.smith@councilnote.com',
    password: 'password123',
    passwordHash: null
    },
    {
    fullname:"Lisa Smith",
    email: 'lisa.smith@councilnote.com',
    password: 'password334',
    passwordHash: null 
    },
    {
    fullname:"Reg Sampson",
    email: 'reg.sampson@aol.com',
    password: 'password777',
    passwordHash: null 
    },
    {
    fullname:"Test Name",
    email: 'test.name@yahoo.com',
    password: 'password990',
    passwordHash: null 
    }
]

const problems = [
    {
        "problemtitle": "test problem title",
        "problemdescription": "test problem description",
        "user":users.find(obj => obj.fullname === 'Test Name'),
        "DateAdded": Date.now(),
        "Urgent":true,
        "Soon":false,
        "IsResolved":false,
        "problemphoto": {},
        "comments": {
            "content": "this is a bad problem",
            "user":users.find(obj => obj.fullname === 'Reg Sampson'),
            "DateAdded": Date.now(),

        }
    },
    {
        "problemtitle": "test problem title again",
        "problemdescription": "test problem description2",
        "user":users.find(obj => obj.fullname === 'Lisa Smith'),
        "DateAdded": Date.now(),
        "Urgent": false,
        "Soon":true,
        "IsResolved":false,
        "problemphoto": {},
        "comments": {
            "content": "this is a bad problem again",
            "user":users.find(obj => obj.fullname === 'John Smith'),
            "DateAdded": Date.now(),

        }
    }
]

async function seedUsers() {
    await mongoose.connect(process.env.MONGO_URI).then(async () => {
        await User.insertMany(users)
        
        
    }).then(() => {
        mongoose.connection.close()
    })
}


async function seedProblems() {
    await mongoose.connect(process.env.MONGO_URI).then(async () => {
        await Problem.insertMany(problems)
        
    }).then(() => {
        mongoose.connection.close()
    })
}


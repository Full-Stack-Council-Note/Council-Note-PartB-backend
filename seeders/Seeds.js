const mongoose = require("mongoose")
require('dotenv').config();
const {app} = require('../server')
const {Notice, NoticeComment} = require("../models/noticeModel");
const {Problem,ProblemComment} = require("../models/problemModel");
const { User } = require("../models/userModel")

let users = [

    {
        "_id": "674d539c67f52034dc022e9e",
        "fullname": "Robert Bailey",
        "email": "RBailey@email.com",
        "password": "$2b$12$053FOMW8DW2NF1GCz80YH.aZfcsnplp/kRqQFwTWpk61bHufVBfI2",
        "about": "",
        "problemslist":[],
        "noticeslist":[]
    },
    {
        "_id": "674f52dda4cdf7786a1f45d3",
        "fullname": "Paul Bailey",
        "email": "testPB2@councilnote.com",
        "password": "$2b$12$sLJzTtraXFkEOw7FdRvJYO6AtQ3Zbes6K5zHMWgtknMzT4wBv14sy",
        "about": "hello I am about",
        "problemslist":[],
        "noticeslist":[]
    },
    {
        "_id": "674f55cee92e5b3ef9462ad9",
        "fullname": "Rob Bailey",
        "email": "test211@email.com",
        "password": "$2b$12$Hmx7sFM/kkNCQTj0w2vQTuZygp0DtnbaYz3C.LQrybFSB0iZ1LtHe",
        "about": "test about update",
        "problemslist":[],
        "noticeslist":[]
    },
    {
        "_id": "674f55cee92e5b3ef9462ad8",
        "fullname": "Another Person",
        "email": "AnotherPerson@email.com",
        "password": "AnotherPersonPW",
        "about": "test about update",
        "problemslist":[],
        "noticeslist":[]
    }


]

const noticecomments = [
    
]


const notices = [
    {
        "NoticeTitle": "new notice title67",
        "NoticeDescription": "test notice description 576",
        "user":users.find(obj => obj.fullname === 'Rob Bailey'),
        "DateAdded": Date.now(),
        "NoticePhoto": {},
        "NoticeComments": [{
            "content": "this is an interesting notice comment test again",
            "fullname":users.find(obj => obj.fullname === 'Paul Bailey'),
            "DateAdded": Date.now(),
            }]
    },
    
    {
        "NoticeTitle": "test notice again today467",
        "NoticeDescription": "this is a test notice description65",
        "user":users.find(obj => obj.fullname === 'Rob Bailey'),
        "DateAdded": Date.now(),
        "NoticePhoto": {},
        "NoticeComments": [{
            "content": "this is a new notice comment hello",
            "fullname":users.find(obj => obj.fullname === 'Robert Bailey'),
            "DateAdded": Date.now(),
            },
            {
            "content": "testing notice comments more again",
            "fullname":users.find(obj => obj.fullname === 'Paul Bailey'),
            "DateAdded": Date.now(),
            }]
    },
    {
        "NoticeTitle": "one more notice title test",
        "NoticeDescription": "this is a test notice description again now",
        "user":users.find(obj => obj.fullname === 'Rob Bailey'),
        "DateAdded": Date.now(),
        "NoticePhoto": {},
        "NoticeComments": [{
            "content": "And another notice comment hello",
            "fullname":users.find(obj => obj.fullname === 'Robert Bailey'),
            "DateAdded": Date.now(),
            },
            {
            "content": "testing notice comments more again2",
            "fullname":users.find(obj => obj.fullname === 'Rob Bailey'),
            "DateAdded": Date.now(),
            }]
    }
    
]

//async function seedUsers() {
  //  await mongoose.connect(process.env.MONGO_URI).then(async () => {
   //    await User.insertMany(users)
        
        
  //  }).then(() => {
   //     mongoose.connection.close()
   // })
//}
//seedUsers()

//async function seedProblems() {
  //  await mongoose.connect(process.env.MONGO_URI).then(async () => {
    //   await Problem.insertMany(problems)
        
   // }).then(() => {
   //   mongoose.connection.close()
  //  })
//}

//seedProblems()

async function seedNotices() {
    await mongoose.connect(process.env.MONGO_URI).then(async () => {
       await Notice.insertMany(notices)
        
    }).then(() => {
       mongoose.connection.close()
    })
}

seedNotices()
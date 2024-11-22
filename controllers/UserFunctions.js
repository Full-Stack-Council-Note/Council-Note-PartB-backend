// required imports

const { User } = require('../models/user.models')

const dotenv = require('dotenv')
dotenv.config()

// encryption and hashing variables

const crypto = require('crypto')
let encAlgorithm = 'aes-256-cbc'
let encPrivateKey = crypto.scryptSync(process.env.ENC_KEY, 'SpecialSalt', 32)
let encIV = crypto.scryptSync(process.env.ENC_IV, 'SpecialSalt', 16)
let cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV)
let decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV)

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const saltRounds = 15

//@desc function that encrypts a string using the provided algorithms and keys
function encryptString(data){
    cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV)
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
}

//@desc function that decrypts a string using the provided algorithms and keys
function decryptString(data){
    decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV)
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
}

//@desc function that decrypts an object into JSON format
function decryptObject(data){
    return JSON.parse(decryptString(data))
}

//@desc function that hashes and salts a string
async function hashString(stringToHash){
    let saltToAdd = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(stringToHash, saltToAdd)
}

//@desc function that compares hashed and unhashed data to see if they match
async function validateHashedData(providedUnhashedData, storedHashedData){
    return await bcrypt.compare(providedUnhashedData, storedHashedData)
}

//@desc function that generates a JWT using the provided object and JWT secret
function generateJWT(payloadObj){
    return jwt.sign(payloadObj, process.env.JWT_SECRET, { expiresIn: "7d"})
}

//@desc function that generates a JWT using encrypted user data
async function generateUserJWT(userDetails){
    let encryptedUserData = encryptString(JSON.stringify(userDetails))
    return generateJWT({data: encryptedUserData})
}

//@desc function that verifies that the provided user JWT is valid: is the JWT itself valid and do the details from inside the decrypted object match those of the target user
async function verifyUserJWT(userJWT){
    let userJwtVerified = jwt.verify(userJWT,process.env.JWT_SECRET, {complete: true})
    let decryptedJwtPayload = decryptString(userJwtVerified.payload.data)
    let userData = JSON.parse(decryptedJwtPayload)
    let targetUser = await User.findById(userData.userID).exec()
    if (targetUser.password == userData.password && targetUser.email == userData.email){
        return generateJWT({data: userJwtVerified.payload.data})
    } else {
        throw new Error({message: "Invalid user token."})
    }
}

//@desc creates a user to be stored in the database
async function createUser(userDetails){

    userDetails.hashedPassword = await hashString(userDetails.password)

    let newUser = new User(
        { 
            username: userDetails.username,
            email: userDetails.email,
            password: userDetails.hashedPassword,
            isAdmin: userDetails.isAdmin
        }
    )
    return await newUser.save()
}


//updates a user to reflect changes as requested by the user
//access protected
async function updateUser(userDetails){
    return await User.findByIdAndUpdate(userDetails.userID, userDetails.updatedData, {returnDocument: 'after'}).exec()
}

//deletes user from database by ID
//access protected
async function deleteUser(userID){
    return await User.findByIdAndDelete(userID).exec()
}

// deletes user from database by email
async function deleteUserByEmail(email){
    return await User.deleteOne({email})
}


// function designed to handle errors by logging them to the console
function errorHandler(error) {
    console.log(error.message)
}

//find user by ID
async function getSpecificUser(userID){
    return await User.findById(userID)
}

module.exports = {
    encryptString, decryptString, decryptObject, hashString, validateHashedData, 
    generateJWT, generateUserJWT, verifyUserJWT, createUser, updateUser, deleteUser, errorHandler, getSpecificUser, deleteUserByEmail
}
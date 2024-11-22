const jwt = require('jsonwebtoken')
const { verifyUserJWT, decryptString } = require('../controllers/UserFunctions')


//middlware to check whether or not a jwt is present in the cookies
const jwtInHeader = async (request, response, next) => {
    try {
        let headerJwt = request.cookies.jwt
        let newJwt = await verifyUserJWT(headerJwt)
    
        request.cookies.jwt = newJwt
    
        next()
    } catch (err) {console.log(err)}
    
}

//middleware to check whether or not the user is an admin
const adminOnly = async (request, response, next) => {
    let isAdmin = request.cookies.isAdmin

    if (isAdmin === 'true') {
        next()
    } else {
        next(new Error('Only council staff admins can access this route!'))
    }
}

module.exports = {
    jwtInHeader, adminOnly
}
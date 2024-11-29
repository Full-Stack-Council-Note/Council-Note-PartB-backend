const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
//const {auth, adminOnly} = require('../middleware/authMiddleware'); needed here?

// add /user/  to these?
router.post('/register', authCtrl.register);
router.post("/register_admin", authCtrl.registerAdmin);
router.post("/changePassword", authCtrl.changePassword);

router.post("/login", authCtrl.login);
router.post("/admin_login", authCtrl.adminLogin);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);

module.exports = router;



//needed?
//const express = require('express')
//const router = express.Router()
//const path = require('path')

//router.get('^/$|/index(.html)?', (req, res) => {
//    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
//})

//module.exports = router
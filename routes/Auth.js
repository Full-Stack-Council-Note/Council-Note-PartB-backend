const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
//const {auth, adminOnly} = require('../middleware/authMiddleware'); needed here?

// add /user/  to these?
router.post('/register', authCtrl.register);
router.post("/register_admin", authCtrl.registerAdmin);
router.post("/changePassword", authCtrl.changePassword);
///auth/loginfm
router.post("/loginfm", authCtrl.loginfm);
router.post("/admin_login", authCtrl.adminLogin);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);

module.exports = router;
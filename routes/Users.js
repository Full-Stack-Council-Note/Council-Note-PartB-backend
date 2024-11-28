const router = require('express').Router();
const auth = require('../middleware/UserMiddleware');
const {
    searchUser,
    getUser,
    updateUser,
    UpdateProblemsList,
    UpdateNoticesList,
    deleteProblem,
    deleteNotice,

} = require('../controllers/UserCtrl');
//const userCtrl = require('../controllers/UserCtrl');

router.get('/searchUser', searchUser);

router.get('/user/:id', getUser);

router.patch("/user", updateUser);

router.patch("/user/:id/UpdateProblemsList", UpdateProblemsList);
router.patch("/user/:id/UpdateNoticesList", UpdateNoticesList);
router.delete("user/:id/deleteProblem", deleteProblem);
router.delete("user/:id/deleteNotice", deleteNotice);
      //or patch
module.exports = router;
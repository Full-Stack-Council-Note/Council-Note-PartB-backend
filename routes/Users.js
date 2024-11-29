const router = require('express').Router();
const {auth, adminOnly} = require('../middleware/authMiddleware');
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

router.get('/searchUser', auth, adminOnly, searchUser);

router.get('/user/:id', auth, adminOnly, getUser);

router.patch("/user", auth, adminOnly, updateUser);

router.patch("/user/:id/UpdateProblemsList", auth, adminOnly, UpdateProblemsList);
router.patch("/user/:id/UpdateNoticesList", auth, adminOnly, UpdateNoticesList);
router.delete("user/:id/deleteProblem", auth, adminOnly, deleteProblem);
router.delete("user/:id/deleteNotice", auth, adminOnly, deleteNotice);
      //or patch
module.exports = router;
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
    deleteUser

} = require('../controllers/UserCtrl');
//const userCtrl = require('../controllers/UserCtrl');

router.get('/searchUser', auth, adminOnly, searchUser);

router.get('/:userId/', auth, adminOnly, getUser);

router.patch("/:userId/", auth, adminOnly, updateUser);

router.patch("/:userId/UpdateProblemsList", auth, adminOnly, UpdateProblemsList);
router.patch("/:userId/UpdateNoticesList", auth, adminOnly, UpdateNoticesList);
router.delete("/:userId/deleteProblem", auth, adminOnly, deleteProblem);
router.delete("/:userId/deleteNotice", auth, adminOnly, deleteNotice);
router.delete("/:userId/deleteUser", auth, adminOnly, deleteUser);

      //or patch
module.exports = router;
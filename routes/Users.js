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
                    //auth, adminOnly
router.get('/searchUser', searchUser);

router.get('/:id/', auth, adminOnly, getUser);

router.patch("/:id/", auth, adminOnly, updateUser);

router.patch("/:id/UpdateProblemsList", auth, adminOnly, UpdateProblemsList);
router.patch("/:id/UpdateNoticesList", auth, adminOnly, UpdateNoticesList);
router.delete("/:id/deleteProblem", auth, adminOnly, deleteProblem);
router.delete("/:id/deleteNotice", auth, adminOnly, deleteNotice);
router.delete("/:id/deleteUser", auth, adminOnly, deleteUser);

      //or patch
module.exports = router;
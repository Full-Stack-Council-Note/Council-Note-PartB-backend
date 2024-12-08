const router = require('express').Router();
const {auth, adminOnly} = require('../middleware/authMiddleware');
const {
    searchUsers,
    getUser,
    updateUser,
    UpdateProblemsList,
    UpdateNoticesList,
    deleteProbleminList,
    deleteNoticeinList,
    deleteUser

} = require('../controllers/UserCtrl');
//const userCtrl = require('../controllers/UserCtrl');
                    //auth, adminOnly
router.get('/searchUsers', auth, searchUsers);
//auth, adminOnly
router.get('/:id/MyProfile', auth, getUser);

router.patch("/:id/updateUser", auth, updateUser);

router.patch("/:id/UpdateProblemsList", auth, UpdateProblemsList);
router.patch("/:id/UpdateNoticesList", auth,  UpdateNoticesList);
router.delete("/:id/deleteProbleminList", auth,  deleteProbleminList);
router.delete("/:id/deleteNoticeinList", auth,  deleteNoticeinList);
router.delete("/:id/deleteUser", auth, deleteUser);

      //or patch
module.exports = router;
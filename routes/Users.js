const router = require('express').Router();
const {auth, adminOnly} = require('../middleware/authMiddleware');
const {
    searchpeople,
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
router.get('/searchpeople', auth, searchpeople);
//auth, adminOnly
router.get('/:id/profile', auth, getUser);

router.patch("/:id/profile/updateUser", auth, updateUser);

router.patch("/:id/profile/UpdateProblemsList", auth, UpdateProblemsList);
router.patch("/:id/profile/UpdateNoticesList", auth,  UpdateNoticesList);
router.delete("/:id/profile/deleteProbleminList", auth,  deleteProbleminList);
router.delete("/:id/profile/deleteNoticeinList", auth,  deleteNoticeinList);
router.delete("/:id/profile/deleteUser", auth, deleteUser);

      //or patch
module.exports = router;
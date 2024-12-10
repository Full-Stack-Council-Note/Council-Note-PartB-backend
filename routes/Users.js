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
router.get('/:id/cnprofile', auth, getUser);

router.patch("/:id/cnprofile/updateUser", auth, updateUser);

router.patch("/:id/cnprofile/UpdateProblemsList", auth, UpdateProblemsList);
router.patch("/:id/cnprofile/UpdateNoticesList", auth,  UpdateNoticesList);
router.delete("/:id/cnprofile/deleteProbleminList", auth,  deleteProbleminList);
router.delete("/:id/cnprofile/deleteNoticeinList", auth,  deleteNoticeinList);
router.delete("/:id/cnprofile/deleteUser", auth, deleteUser);

      //or patch
module.exports = router;
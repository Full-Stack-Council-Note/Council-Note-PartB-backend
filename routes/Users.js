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
//auth, adminOnly
router.get('/:id/', getUser);

router.patch("/:id/", auth, updateUser);

router.patch("/:id/UpdateProblemsList", auth, UpdateProblemsList);
router.patch("/:id/UpdateNoticesList", auth,  UpdateNoticesList);
router.delete("/:id/deleteProblem", auth,  deleteProblem);
router.delete("/:id/deleteNotice", auth,  deleteNotice);
router.delete("/:id/deleteUser", auth, deleteUser);

      //or patch
module.exports = router;
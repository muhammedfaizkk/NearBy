
const express = require("express");
const router = express.Router();
const { userRegistration, userLogin, getUsers, userProfupdate, userAccountDelete, userAcive } = require("../controllers/userController");
const { userAuth,authorization } = require("../middleware/auth");



router.route("/signup").post(userRegistration)
router.route("/login").post(userLogin);
router.route("/users").get(userAuth, authorization, getUsers);
router.route("/profileUpdate/:id").post(userAuth, userProfupdate);
router.route("/deleteAccount/:id").delete(userAuth, userAccountDelete);
router.route("/userAcive/:id").put(userAuth,authorization,userAcive);

module.exports = router;


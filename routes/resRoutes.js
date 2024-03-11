
const express = require("express");
const { addRestuarant, getRestuarants, myRestaurants, updateRestuarants, restuarantRemove } = require("../controllers/resController");
const { userAuth } = require("../middleware/auth");
const upload = require("../middleware/fileUpload");
const router = express.Router()


router.route('/addres/:id').post(userAuth, upload.array("photographs",3), addRestuarant);
router.route('/getAllres').get(getRestuarants);
router.route('/myRestaurants/:id').get(userAuth, myRestaurants);
router.route('/updateRes/:id').put(userAuth, upload.single("photographs"), updateRestuarants);
router.route('/resRemove/:id').delete(userAuth, restuarantRemove);


module.exports = router;

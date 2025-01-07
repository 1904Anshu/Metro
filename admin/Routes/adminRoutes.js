const express = require("express");
const { adminSignup, adminLogin } = require("../Contollers/adminContoller");
const { addStation, updateFare } = require("../Contollers/addStationContoller");
const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/add-station", addStation);
router.put("/update-fare", updateFare);

module.exports = router;

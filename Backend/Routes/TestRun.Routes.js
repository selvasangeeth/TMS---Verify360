const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const { getAllTestRuns } = require("../Controller/Testrun");


router.get("/getAllTestRuns",getAllTestRuns);




module.exports = router;
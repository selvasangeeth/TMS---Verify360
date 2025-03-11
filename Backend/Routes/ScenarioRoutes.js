const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const {createScenario,getScenario} = require("../Controller/Scenarios");

router.post("/createScenario",auth,createScenario)
router.get("/getScenario/:moduleId",auth,getScenario);




module.exports = router;
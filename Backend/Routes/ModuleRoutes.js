const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const { createModule,getModules } = require("../Controller/Module");

router.post("/createModule",auth,createModule)
router.get("/getModules/:projectId",getModules);




module.exports = router;
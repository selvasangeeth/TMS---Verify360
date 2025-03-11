const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const { createHyperLink, deleteHyperLink, getHyperLink, updateHyperLink } = require("../Controller/HyperLink");

router.post("/createHyperLink",auth,createHyperLink)
router.delete("/deleteHyperLink/:id",auth,deleteHyperLink);
router.get("/getHyperLink",auth,getHyperLink);
router.put("/updateHyperLink/:id",auth,updateHyperLink)


module.exports = router;
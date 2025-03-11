const express = require("express");
const router = express.Router();
const upload = require("../Middleware/storeFiles")
const auth = require("../Middleware/auth");

// Middleware to handle file size error
function handleFileSizeError(err, req, res, next) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        msg: 'File size is too large. The maximum size allowed is 10MB.'
      });
    }
    next(err); 
  }


const {createTestCase, updateTestCaseStatus,getTestCase} = require("../Controller/Testcase");

router.post("/createTestCase",auth,createTestCase);
router.post("/updatedTestCase",auth,upload.single('reference'),handleFileSizeError,updateTestCaseStatus)
router.get("/getTestCase/:scenarioId",auth,getTestCase);





module.exports = router;
const mongoose = require("mongoose");

const testRunSchema = mongoose.Schema({
    
    timestamp:{
        type:Date,
        default:Date.now()
    },
    taskId :{
        type :String,
        required : true
    },
    subTaskId :{
        type: String,
        required :true
    },
    testScenario :{
        type : String,
        required :true
    },
    testedBy :{
        type: String,
        required : true
    },
    testRegion :{
        type : String,
        required : true
    },
    testedCasePassedCount :{
        type :Number,
        required :true
    },
    testStatus :{
        type :String,
        required :true
    },
    testCaseName :{
        type : String,
        required : true
    },
    
});

module.exports = mongoose.model("Testrun", testRunSchema);

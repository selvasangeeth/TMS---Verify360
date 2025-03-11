const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema({
    scenarioIdstr :{
        type:String,
        required:true
    },
    module :{
        type :mongoose.Schema.Types.ObjectId,
        ref : "module"
    },
    createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"User"
    },
    taskId :{
        type : String,
        required :true
    },
    subTaskId :{
        type :String,
        required :true
    },
    scenarioDescription :{
        type :String,
        required :true

    },
     timestamp:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model('scenario',scenarioSchema)
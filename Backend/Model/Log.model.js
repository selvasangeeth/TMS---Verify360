const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    action :{
        type:String,
        required:true
    },
    entityType :{
         type:String,
         required:true
    },
    entityId:{
         type:mongoose.Schema.Types.ObjectId,
         required:true
    },
    user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
    details :{
        type : String
    },
    path :{
        type:String,
    }
})

module.exports = mongoose.model('Log',LogSchema);
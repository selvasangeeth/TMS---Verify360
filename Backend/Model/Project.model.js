const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({

    projectName :{
        type : String,
        
    },
    createdBy : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
       
    },
    projectLogo :{
        type : String,
       

    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
    assignedTo :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }]
    // logs: [
    //     {
    //       action: {
    //         type: String,
    //         required: true
    //       },
    //       user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //         required: true
    //       },
    //       timeStamp: {
    //         type: Date,
    //         default: Date.now
    //       }
    //     }
    //   ]

});

module.exports = mongoose.model("Project", projectSchema);
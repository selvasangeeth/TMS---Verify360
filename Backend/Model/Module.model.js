const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
    moduleName: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subModule: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    timestamp:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model("module", moduleSchema);
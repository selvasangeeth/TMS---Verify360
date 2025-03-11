const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Name :{
              type :String,
              required :true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    timestamp:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("User", userSchema);

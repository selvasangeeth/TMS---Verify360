const mongoose = require('mongoose');


const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {

        const regex = /^(ftp|http|https):\/\/[^ "]+$/;
        return regex.test(value);

      },
      message: 'Please provide a valid URL'
    }
  },
  AddedById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Link = mongoose.model('Link', linkSchema);

module.exports = Link;

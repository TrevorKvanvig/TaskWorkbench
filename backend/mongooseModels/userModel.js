const boardsSchema = require('./boardModel');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    boards: [boardsSchema]
  },
);


//export User collection to be used in other files using the BoardSchema declared
module.exports = mongoose.model('user', userSchema);
const teamSchema = require('./teamModel');
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
    teams: [teamSchema]
  },
);


//export User collection to be used in other files using the BoardSchema declared
module.exports = mongoose.model('user', userSchema);
const teamSchema = require('./teamModel');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    team_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Team',
      }
  ]
  }, { timestamps: true }
);


//export User collection to be used in other files using the BoardSchema declared
module.exports = mongoose.model('User', userSchema);
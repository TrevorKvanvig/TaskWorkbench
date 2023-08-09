const teamSchema = require('./teamModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
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

// static signup menthod
userSchema.statics.signup = async function(username, email, password) {

  if (!email || !password || !username){
    throw Error('all feilds must be filled');
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not valid');
  }
  // if I need strong passwords
  // if(!validator.isStrongPassword(password)){
  //   throw Error('Password not strong enough');
  // }

  const eExists = await this.findOne({ email });
  const uEists = await this.findOne({ username });

  if (eExists) {
    throw Error('Email is already being used');
  }
  if (uEists) {
    throw Error('Username is already Being Used');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash
  });

  return user
}

//export User collection to be used in other files using the BoardSchema declared
module.exports = mongoose.model('User', userSchema);
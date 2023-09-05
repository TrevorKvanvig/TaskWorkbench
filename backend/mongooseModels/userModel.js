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
    throw Error('Please Fill In All Feilds');
  }
  if(!validator.isEmail(email)){
    throw Error('Email Is Not A Valid Email');
  }
  // if I need strong passwords
  // if(!validator.isStrongPassword(password)){
  //   throw Error('Password not strong enough');
  // }

  const eExists = await this.findOne({ email });
  const uEists = await this.findOne({ username });

  if (eExists) {
    throw Error('Email Is Already Being Used');
  }
  if (uEists) {
    throw Error('Username Is Already Being Used');
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

userSchema.statics.login = async function(email, password){

  if (!email || !password){
    throw Error('Please Fill In All Feilds');
  }

  const user = await this.findOne({email});

  if(!user) {
    throw Error('There Is No Account With This Email')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw Error('Incorrect Password')
  }

  return user
}

//export User collection to be used in other files using the BoardSchema declared
module.exports = mongoose.model('User', userSchema);
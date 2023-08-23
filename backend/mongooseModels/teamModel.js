const boardSchema = require('./boardModel');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    teamTitle: {
      type: String,
      required: true,
    },
    teamOwner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    boards: [boardSchema],
  },
);

teamSchema.pre('remove', async function(next) {
  const Team = this.model('Team');
  const User = this.model('User');

  // Remove team ID from user documents
  await User.updateMany({ team_ids: this._id }, { $pull: { team_ids: this._id } });

  next();
});

//export Boards collection to be used in other files using the BoardSchema declared
module.exports  = mongoose.model('Team', teamSchema);

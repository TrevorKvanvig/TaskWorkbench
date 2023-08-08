const boardSchema = require('./boardModel');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    teamTitle: {
      type: String,
      required: true,
    },
    boards: [boardSchema],
  },
);

//export Boards collection to be used in other files using the BoardSchema declared
module.exports = teamSchema;
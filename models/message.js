const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  time: {type: Date, required: true},
  text: {type: String, required: true, maxlength: 10000},
});

module.exports = mongoose.model('Message', MessageSchema);
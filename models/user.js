const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {type: String, required: true, maxlength: 100},
  last_name: {type: String, required: true, maxlength: 100},
  username: {type: String, required: true},
  password: {type: String, required: true, maxlength: 100},
});

UserSchema
.virtual('url')
.get(function() {return '/catalog/works/' + this._id});

UserSchema
.virtual('name')
.get(function() {return `${this.first_name} ${this.last_name}`});

module.exports = mongoose.model('User', UserSchema);
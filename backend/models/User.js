const mongoose = require('mongoose');
const UserSchema = require('../Schema/User');

let UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
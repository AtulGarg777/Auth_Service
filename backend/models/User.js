const { required } = require('joi');
const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

let UserModel=mongoose.model('user',UserSchema);

module.exports=UserModel;
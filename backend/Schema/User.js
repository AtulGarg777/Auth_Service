const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }]
}, { timestamps: true })

module.exports = UserSchema;
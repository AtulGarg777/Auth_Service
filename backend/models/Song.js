const mongoose = require('mongoose');
const SongSchema = require('../Schema/Song');

let SongModel = mongoose.model('song', SongSchema);

module.exports = SongModel;
const mongoose = require('mongoose');
const playlistSchema = require('../Schema/PlaylistSchema');

let PlaylistModel = mongoose.model('playlist', playlistSchema);

module.exports = PlaylistModel;
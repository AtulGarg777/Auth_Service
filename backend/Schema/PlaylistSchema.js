const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    songs: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'song' }],
    coverUrl: {
        type: String
    },
    isPrivate: { type: Boolean, default: false },
    description: { type: String, maxLength: 200 },
}, {
    timestamps: true
})

module.exports = playlistSchema;
let mongoose = require('mongoose');

let SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: [{ type: String, required: true }],
    album: { type: String },
    audioUrl: { type: String, required: true },
    coverUrl: { type: String },
    duration: Number
})
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    trim: true,
  },
  artist: {
    type: String,
    required: [true, "Artist is required!"],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, "Genre is required!"],
  },
  album: {
    type: String,
    trim: true,
  },
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;

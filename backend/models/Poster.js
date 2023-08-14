const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
  image: Buffer,
});

const Poster = mongoose.model("Poster", posterSchema);

module.exports = Poster;

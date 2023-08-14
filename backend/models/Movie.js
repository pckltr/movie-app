const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  imdbID: String,
  type: String,
  poster: { type: mongoose.Schema.Types.ObjectId, ref: "Poster" },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

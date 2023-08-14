const mongoose = require("mongoose");
const Movie = require("./models/Movie");
const Poster = require("./models/Poster");

mongoose.connect("mongodb://localhost:27017/movieApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function clearCollections() {
  try {
    await Movie.deleteMany({});

    await Poster.deleteMany({});

    console.log("Collections cleared successfully.");
  } catch (error) {
    console.error("Error clearing collections:", error);
  } finally {
    mongoose.connection.close();
  }
}

clearCollections();

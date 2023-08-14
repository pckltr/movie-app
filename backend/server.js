require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const db = require("./db");

const Movie = require("./models/Movie");
const Poster = require("./models/Poster");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.get("/api/movies", async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ error: "Missing search parameter" });
    }

    const encodedQuery = encodeURIComponent(search);
    const apiUrl = `http://www.omdbapi.com/?s=${encodedQuery}&apikey=${process.env.OMDB_API_KEY}`;
    const response = await axios.get(apiUrl);
    const totalResults = parseInt(response.data.totalResults);

    const moviesPerPage = 10;
    const totalPages = Math.ceil(totalResults / moviesPerPage);

    const allMovies = [];

    for (let page = 1; page <= totalPages; page++) {
      const pageUrl = `${apiUrl}&page=${page}`;
      const pageResponse = await axios.get(pageUrl);
      const pageData = pageResponse.data.Search;

      const savedMovies = await Promise.all(
        pageData.map(async (movie) => {
          const existingMovie = await Movie.findOne({ imdbID: movie.imdbID });

          if (existingMovie) {
            return existingMovie;
          }

          const newMovie = new Movie({
            title: movie.Title,
            year: movie.Year,
            imdbID: movie.imdbID,
            type: movie.Type,
          });

          if (movie.Poster && movie.Poster !== "N/A") {
            const imageResponse = await axios.get(movie.Poster, {
              responseType: "arraybuffer",
            });
            const newPoster = new Poster({ image: imageResponse.data });
            await newPoster.save();
            newMovie.poster = newPoster._id;
          }

          return await newMovie.save();
        })
      );

      allMovies.push(...savedMovies);
    }

    const populatedMovies = await Movie.find({
      title: { $regex: search, $options: "i" },
    }).populate("poster");

    res.json(populatedMovies);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

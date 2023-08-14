import React from "react";
import { render, screen } from "@testing-library/react";
import MovieList from "./MovieList";

const mockMovies = [
  {
    _id: "1",
    title: "Movie 1",
    year: "2022",
    type: "movie",
    imdbID: "tt1234567",
    poster: {
      image: {
        data: "base64encodeddata",
      },
    },
  },
];

test("renders movie list correctly", () => {
  render(<MovieList sortMovies={(movies) => movies} movies={mockMovies} />);

  const movieTitles = mockMovies.map((movie) => screen.getByText(movie.title));
  expect(movieTitles).toHaveLength(mockMovies.length);

  const imdbButtons = screen.getAllByRole("link", { name: /IMDB/i });
  expect(imdbButtons).toHaveLength(mockMovies.length);
});

test("renders skeleton when poster is missing", () => {
  const movieWithoutPoster = {
    _id: "2",
    title: "Movie 2",
    year: "2023",
    type: "movie",
    imdbID: "tt2345678",
    poster: null,
  };

  render(
    <MovieList
      sortMovies={(movies) => [movieWithoutPoster]}
      movies={[movieWithoutPoster]}
    />
  );

  const skeleton = screen.getByTestId("skeleton");
  expect(skeleton).toBeInTheDocument();
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

const movies = [
  {
    _id: "1",
    title: "Matrix 1",
    year: "2022",
    imdbID: "tt1234567",
    type: "movie",
    poster: "poster1",
  },
];

describe("App", () => {
  it("renders the App component and fetches movies", async () => {
    render(<App />);

    axios.get.mockResolvedValueOnce({ data: movies });

    const matrixButton = screen.getByText("Matrix");
    fireEvent.click(matrixButton);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/movies?search=Matrix"
    );

    await waitFor(async () => {
      const progressBar = screen.queryByRole("progressbar");

      expect(progressBar).toBeInTheDocument();

      await waitFor(async () => {
        expect(progressBar).not.toBeInTheDocument();
      });
    });

    movies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });
});

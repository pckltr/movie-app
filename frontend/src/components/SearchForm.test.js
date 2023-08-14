import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  const fetchMovies = jest.fn();
  const setMovieName = jest.fn();

  it("calls fetchMovies and setMovieName with the correct movie name when Enter key is pressed", () => {
    render(
      <SearchForm
        movieName=""
        setMovieName={setMovieName}
        fetchMovies={fetchMovies}
      />
    );

    const searchInput = screen.getByLabelText("Search movie");

    fireEvent.change(searchInput, { target: { value: "Matrix" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    expect(fetchMovies).toHaveBeenCalledWith("Matrix");
    expect(setMovieName).toHaveBeenCalledWith("Matrix");
  });
});

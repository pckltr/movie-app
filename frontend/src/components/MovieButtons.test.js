import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieButtons from "./MovieButtons";

describe("MovieButtons", () => {
  const fetchMovies = jest.fn();

  it("renders the MovieButtons component", () => {
    render(<MovieButtons fetchMovies={fetchMovies} />);
    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements).toHaveLength(3);
  });

  it("calls fetchMovies with the correct movie name when a button is clicked", () => {
    render(<MovieButtons fetchMovies={fetchMovies} />);

    const matrixButton = screen.getByText("Matrix");
    fireEvent.click(matrixButton);
    expect(fetchMovies).toHaveBeenCalledWith("Matrix");

    const reloadedButton = screen.getByText("Matrix Reloaded");
    fireEvent.click(reloadedButton);
    expect(fetchMovies).toHaveBeenCalledWith("Matrix Reloaded");

    const revolutionsButton = screen.getByText("Matrix Revolutions");
    fireEvent.click(revolutionsButton);
    expect(fetchMovies).toHaveBeenCalledWith("Matrix Revolutions");
  });
});

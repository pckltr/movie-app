import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieButtons from "./MovieButtons";

describe("MovieButtons", () => {
  const fetchMovies = jest.fn();

  it("renders the MovieButtons component", () => {
    render(<MovieButtons fetchMovies={fetchMovies} />);
    const button = screen.getByText("Matrix Series");
    expect(button).toBeInTheDocument();
  });

  it("opens the menu when the button is clicked", async () => {
    render(<MovieButtons fetchMovies={fetchMovies} />);
    const button = screen.getByText("Matrix Series");
    userEvent.click(button);

    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  it("calls fetchMovies with the correct movie name when a menu item is clicked", async () => {
    render(<MovieButtons fetchMovies={fetchMovies} />);
    const button = screen.getByText("Matrix Series");
    userEvent.click(button);

    const menuItem = await screen.findByText("Matrix Reloaded");
    fireEvent.click(menuItem);

    expect(fetchMovies).toHaveBeenCalledWith("Matrix Reloaded");
  });

  it("closes the menu when a menu item is clicked", async () => {
    render(<MovieButtons fetchMovies={fetchMovies} />);
    const button = screen.getByText("Matrix Series");
    userEvent.click(button);

    const menuItem = await screen.findByText("Matrix Reloaded");
    fireEvent.click(menuItem);

    const menu = screen.queryByRole("listbox");
    expect(menu).not.toBeInTheDocument();
  });
});

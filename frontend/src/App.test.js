import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";

describe("App", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("renders the App component and fetches movies", async () => {
    const mockMovies = [{ title: "Movie 1", year: "2021", type: "movie" }];

    mockAxios
      .onGet(/http:\/\/localhost:4000\/api\/movies\?search=.*/)
      .reply(200, mockMovies);

    render(<App />);

    await waitFor(async () => {
      expect(screen.queryByText("is loading...")).toBeNull();

      await waitFor(() => {
        expect(screen.getByText("Movie 1")).toBeInTheDocument();
      });
    });
  });
});

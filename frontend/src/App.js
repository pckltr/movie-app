import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import SortDropdown from "./components/SortDropdown";
import MovieList from "./components/MovieList";
import MovieButtons from "./components/MovieButtons";
import {
  AppBar,
  Box,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchForm from "./components/SearchForm";
import * as Constants from "./constants";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("Spider-Verse");
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState("none");
  const sortingOptions = Constants.SORTING_OPTIONS;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#f44336",
          },
          secondary: {
            main: "#ffffff",
          },
        },
        typography: {
          fontFamily: "Roboto",
        },
      }),
    [prefersDarkMode]
  );

  const fetchMovies = (searchTerm) => {
    setLoading(true);

    const encodedQuery = encodeURIComponent(searchTerm);

    axios
      .get(`http://localhost:4000/api/movies?search=${encodedQuery}`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sortMovies = (movies) => {
    if (sorting === "none") {
      return movies;
    }
    const sortedMovies = [...movies];

    sortedMovies.sort((a, b) => {
      const [prop, direction] = sorting.split("-");
      const propA = a[prop];
      const propB = b[prop];

      if (direction === "asc") {
        return propA.localeCompare(propB);
      } else {
        return propB.localeCompare(propA);
      }
    });

    return sortedMovies;
  };

  useEffect(() => {
    fetchMovies(movieName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static">
          <Toolbar
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              padding: "1rem 0",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Movie List {loading && "is loading..."}{" "}
              {!loading && movies.length > 0 && `(${movies.length} results)`}
            </Typography>
            <MovieButtons fetchMovies={fetchMovies} />
            <SortDropdown
              sorting={sorting}
              setSorting={setSorting}
              sortingOptions={sortingOptions}
            />
            <SearchForm
              fetchMovies={fetchMovies}
              movieName={movieName}
              setMovieName={setMovieName}
            />
          </Toolbar>
          {loading && <LinearProgress />}
        </AppBar>
      </Box>
      <MovieList sortMovies={sortMovies} movies={movies} />
    </ThemeProvider>
  );
};

export default App;

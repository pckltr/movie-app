import React from "react";
import { TextField, Box, Autocomplete } from "@mui/material";

const SearchForm = ({ movieName, setMovieName, fetchMovies }) => {
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchMovies(e.target.value);
      setMovieName(e.target.value);
    }
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", marginLeft: "2rem" }}>
      <Autocomplete
        sx={{ width: 200 }}
        value={movieName}
        freeSolo
        options={[]}
        renderInput={(params) => <TextField {...params} label="Search movie" />}
        onKeyDown={(e) => handleSearch(e)}
      />
    </Box>
  );
};

export default SearchForm;

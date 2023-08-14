import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";

const movieNames = ["Matrix", "Matrix Reloaded", "Matrix Revolutions"];

const MovieButtons = ({ fetchMovies }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (movieName) => {
    fetchMovies(movieName);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        color="secondary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Matrix Series
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {movieNames.map((movieName) => (
          <MenuItem
            key={movieName}
            variant="solid"
            size="large"
            color="secondary"
            onClick={() => handleMenuItemClick(movieName)}
          >
            {movieName}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MovieButtons;

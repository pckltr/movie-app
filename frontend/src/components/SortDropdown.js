import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortDropdown = ({ sorting, setSorting, sortingOptions }) => {
  return (
    <FormControl variant="standard" sx={{ marginLeft: "1rem" }}>
      <InputLabel id="sort-label">Sort by:</InputLabel>
      <Select
        labelId="sort-label"
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
        label="Sort by"
      >
        {sortingOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortDropdown;

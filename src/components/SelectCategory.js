import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

const SelectCategory = ({ control }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>בחר קטגוריה</InputLabel>
        <Controller
          name="category" // This is the field name in react-hook-form
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="בחר קטגוריה"
            >
              <MenuItem value="Bakery">Bakery</MenuItem>
              <MenuItem value="Dairy">Dairy</MenuItem>
              <MenuItem value="Frozen food">Frozen food</MenuItem>
              <MenuItem value="Meat">Meat</MenuItem>
              <MenuItem value="Produce">Produce</MenuItem>
              <MenuItem value="Uncategorized">Uncategorized</MenuItem>
            </Select>
          )}
        />
      </FormControl>
    </Box>
  );
};

export default SelectCategory;

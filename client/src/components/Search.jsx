import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  Box,
  TextField,
  ThemeProvider,
  createTheme,
  colors,
} from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B7D5E6',
      light: '#B7C4CF',
      contrastText: '#375E3D',
    },
    secondary: {
      main: '#EEE3CB',
      dark: '#967E76',
    },
  },
});

const styles = {
  '&.MuiButton-root': {
    border: '2px black solid',
  },
  '&.MuiButton-text': {
    color: theme.palette.primary.contrastText,
  },
  '&.MuiButton-contained': {
    color: theme.palette.primary.light,
  },
};

function Search() {
  const [breed, setVal] = useState(() => '');
  const [hairLength, setHairLength] = useState(() => '');
  const [species, setSpecies] = useState(() => '');
  const [age, setAge] = useState(() => '');
  const [gender, setGender] = useState(() => '');
  const [size, setSize] = useState(() => '');

  const breedUpdate = (event) => {
    setVal(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    const searchBy = {
      breed: breed.toLocaleLowerCase(),
      hairLength,
      species,
      age,
      gender,
      size,
    };
    const config = {
      method: 'post',
      url: 'http://localhost:8080/feed/api/search',
      headers: {
        'Content-Type': 'application/json',
      },
      data: searchBy,
    };

    // axios(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     alert(`${error.response.data} / Invalid Breed`);
    //   });
  };

  const hairUpdate = (event) => {
    setHairLength(event.target.value);
  };

  const speciesUpdate = (event) => {
    setSpecies(event.target.value);
  };

  const ageUpdate = (event) => {
    setAge(event.target.value);
  };

  const genderUpdate = (event) => {
    setGender(event.target.value);
  };
  const sizeUpdate = (event) => {
    setSize(event.target.value);
  };

  return (
    <div id="search">
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          onSubmit={submit}
          sx={{
					  display: 'inline-block',
					  maxWidth: '500px',
					  minWidth: '280px',
					  '& .MuiTextField-root': { width: '280px' },
					  bgcolor: 'primary.main',
          }}
        >
          <TextField
            label="breed"
            type="text"
            value={breed}
            onChange={breedUpdate}
            InputLabelProps={{
						  style: { color: 'primary.contrastText' },
            }}
          />
          <InputLabel id="Hair-Length">Hair Length</InputLabel>
          <Select
            labelId="Hair-Length"
            label="Hair length"
            value={hairLength}
            onChange={hairUpdate}
          >
            <MenuItem value="short">Short</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="long">Long</MenuItem>
          </Select>
          <InputLabel id="Species">Species</InputLabel>
          <Select
            labelId="Species"
            label="Species"
            value={species}
            onChange={speciesUpdate}
          >
            <MenuItem value="cat">Cat</MenuItem>
            <MenuItem value="dog">Dog</MenuItem>
          </Select>
          <InputLabel id="Age">Age</InputLabel>
          <Select labelId="Age" label="Age" value={age} onChange={ageUpdate}>
            <MenuItem value="baby">Baby</MenuItem>
            <MenuItem value="young">Young</MenuItem>
            <MenuItem value="adult">Adult</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </Select>
          <InputLabel id="Gender">Gender</InputLabel>
          <Select
            labelId="Gender"
            label="Gender"
            value={gender}
            onChange={genderUpdate}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          <InputLabel id="Size">Size</InputLabel>
          <Select
            labelId="Size"
            label="Size"
            value={size}
            onChange={sizeUpdate}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
            <MenuItem value="xlarge">X-Large</MenuItem>
          </Select>
          <Button variant="contained" type="submit" sx={styles}>
            Submit
          </Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Search;

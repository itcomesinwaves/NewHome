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
  Grid,
} from '@mui/material';
import Adoption from './Adoption.jsx';

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

function Search() {
  const [breed, setVal] = useState(() => '');
  const [hairLength, setHairLength] = useState(() => '');
  const [species, setSpecies] = useState(() => '');
  const [age, setAge] = useState(() => '');
  const [gender, setGender] = useState(() => '');
  const [size, setSize] = useState(() => '');
  const [submitted, setSubmit] = useState(() => false);
  const [pets, setPets] = useState(() => []);
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
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        submitUpdate();
        setPets(response.data.animals);
      })
      .catch((error) => {
        alert(`${error.response.data} / Invalid Breed`);
      });
  };
  const renderPets = () => (
    <Box
      sx={{
			  maxWidth: 700,
			  maxHeight: 700,
			  '& .MuiTextField-root': { width: '280px' },
			  diplay: 'inline-block',
			  m: 'auto',
      }}
    >
      {pets.map((pet) => (
        <Adoption animalsData={pet} />
      ))}
    </Box>
  );
  const submitUpdate = () => {
    setSubmit(!submitted);
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

  // what renders the component
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid
          component="form"
          onSubmit={submit}
          container
          rowSpacing={1}
          columnSpacing={3}
					// Styling
          sx={{
					  width: 600,
					  height: 280,
					  maxWidth: 600,
					  maxHeight: 400,
					  '& .MuiTextField-root': { width: '280px' },
					  diplay: 'inline-block',
					  m: 'auto',
					  backgroundColor: 'secondary.dark',
          }}
        >
          <Grid item>
            <TextField
              label="breed"
              type="text"
              value={breed}
              onChange={breedUpdate}
              InputLabelProps={{
							  style: { color: 'primary.contrastText' },
              }}
            />
          </Grid>
          <Grid item>
            <InputLabel id="Hair-Length">Hair Length</InputLabel>
            <Select
              labelId="Hair-Length"
              label="Hair length"
              value={hairLength}
              onChange={hairUpdate}
              sx={{
							  width: 125,
							  maxWidth: 200,
              }}
            >
              <MenuItem value="short">Short</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="long">Long</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel id="Species">Species</InputLabel>
            <Select
              labelId="Species"
              label="Species"
              value={species}
              onChange={speciesUpdate}
              sx={{
							  width: 125,
							  maxWidth: 200,
              }}
            >
              <MenuItem value="cat">Cat</MenuItem>
              <MenuItem value="dog">Dog</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel id="Age">Age</InputLabel>
            <Select
              labelId="Age"
              label="Age"
              value={age}
              onChange={ageUpdate}
              sx={{
							  width: 125,
							  maxWidth: 200,
              }}
            >
              <MenuItem value="baby">Baby</MenuItem>
              <MenuItem value="young">Young</MenuItem>
              <MenuItem value="adult">Adult</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel id="Gender">Gender</InputLabel>
            <Select
              labelId="Gender"
              label="Gender"
              value={gender}
              onChange={genderUpdate}
              sx={{
							  width: 125,
							  maxWidth: 200,
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel id="Size">Size</InputLabel>
            <Select
              labelId="Size"
              label="Size"
              value={size}
              onChange={sizeUpdate}
              sx={{
							  width: 125,
							  maxWidth: 200,
              }}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
              <MenuItem value="xlarge">X-Large</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              sx={{
							  maxWidth: 100,
							  maxHeight: 100,
							  backgroundColor: 'primary.light',
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
      {submitted ? renderPets() : <div />}
    </div>
  );
}
export default Search;

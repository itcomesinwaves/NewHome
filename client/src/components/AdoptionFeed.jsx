import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, CssBaseline, Container, Typography,
} from '@mui/material';
// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
import Adoption from './Adoption.jsx';
import Loading from './Loading.jsx';
import styles from '../styles.jsx';

function AdoptionFeed() {
  const [animals, setAnimals] = useState([]);
  const [fetchedAnimals, setFetchedAnimals] = useState(false);
  useEffect(() => {
    axios
      .get('/feed/api')
      .then(({ data }) => {
        setAnimals(data.animals);
      })
      .then(() => {
        setFetchedAnimals(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchedAnimals]);

  const updateAnimals = () => {
    setTimeout(() => {
      axios
        .get('/feed/api')
        .then(({ data }) => {
          setAnimals(data.animals);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 6000000);
  };
  updateAnimals();

  // loading feed
  const loadingFeed = () => {
    if (animals.length) {
      // console.log('single animal obj', animals[0]);
      return animals.map((animal) => (
        <div key={JSON.stringify(animal)}>
          <Adoption animalsData={animal} />
          <br />
        </div>
      ));
    }
    return <Loading />;
  };

  return (
    <Box>
      <h1
        style={{
				  textAlign: 'center',
        }}
      >
        Welcome to NewHome
        <Typography color="#228B22" sx={{ variant: 'subtitle1' }}>
          Where you can give those little sonsofguns a new dang ole home
        </Typography>
      </h1>
      {loadingFeed()}
    </Box>
  );
}
export default AdoptionFeed;

// figure out loading functionalitiy
// put mapping through instances of entries in this function
//  <Adoption animalsData={animals[0]} /> <br></br>
// if animalsData (exists) return the <Adoption />
// else if if doesn't render loading animation from material UI
// useEffect(() => {
//   const getAllAnimals = function () {

//     getAllAnimals();

//   }, [animals]);

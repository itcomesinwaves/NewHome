import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import { UserContext } from '../UserContext.jsx';
import { styles } from '../styles.jsx';

// default image, remove later
const image =	'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57334144/1/?bust=1663026743&width=300';

function PetView() {
  const { user, savedList, setSavedList } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  // state from feed component
  const { state } = useLocation();
  const animal = state.animalsData;
  const [status, setStatus] = useState(animal.status);

  // function to save/follow a pet
  const handleSavePet = (e) => {
    // check if user is logged in, and button id;
    if (!loggedIn) {
      // direct a user to log in to save/follow pets
      window.alert('Please sign up/login');
    } else if (e.target.id === 'save') {
      // axios request for favoriting a pet
      const photo = animal.primary_photo_cropped
        ? animal.primary_photo_cropped.small
        : null;
      axios
        .post('/pet/savePet', {
          pet: {
            petId: animal.id,
            species: animal.species,
            breed: animal.breeds.primary,
            gender: animal.gender,
            name: animal.name,
            age: animal.age,
            tags: animal.tags,
            shelterInfo: {
              address: animal.contact.address,
              email: animal.contact.email,
              phone: animal.contact.phone,
            },
            adopted: animal.status,
            photo,
            userId: user.id,
          },
        })
        .then((data) => {
          axios
            .get(`/pet/savePet/${user.id}`)
            .then(({ data }) => {
              setSavedList(data);
            })
            .catch((err) => {
              console.error('error updating pet list\n', err);
            });
        })
        .catch((err) => {
          console.error('error on /pet/savePet req', err);
        });
    } else {
      // axios request for following a pet story
    }
  };

  // conditional rendering based on pet adoption status
  const onAdoptionStatus = () => {
    // if pet === adopted render follow button, render adoption stories
    if (status === 'adoptable') {
      // render follow button and pet stories
      return (
        <Container>
          <Button
            id="save"
            value="save"
            variant="contained"
            onClick={(e) => handleSavePet(e)}
          >
            Save
          </Button>
          <Button onClick={handleAdoption} variant="contained">
            Adopt Me!
          </Button>
        </Container>
      );
    }
    return (
      <Container>
        <Button
          id="follow"
          value="follow"
          variant="contained"
          onClick={(e) => handleSavePet(e)}
        >
          follow
        </Button>
        <Button variant="contained" disabled="true">
          Adopted
        </Button>
      </Container>
    );
    // render save button
  };

  // render pet photo or a generic photo
  const hasPhoto = () => {
    if (animal.photos.length) {
      return animal.photos[0].medium;
    }
    return image;
  };

  // render pet tags, or generic statement
  const hasTags = () => {
    if (animal.tags.length) {
      return (
        <ul>
          {animal.tags.map((tag) => (
            <li key={`${tag}${animal.name}`}>{tag}</li>
          ))}
        </ul>
      );
    }
    return <p>I&apos;m looking for a new crib with chill people</p>;
  };

  // function to preview adopt functionality
  const handleAdoption = () => {
    // axios put req
    if (user === null) {
      window.alert('sign in to take them to their new Home');
      return;
    }
    setStatus('adopted');
    axios
      .put(`/pet/${animal.id}`, {
        pet: {
          userId: user.id,
          adopted: 'adopted',
        },
      })
      .then((data) => {})
      .catch((err) => {
        console.error('error updating pet from client req\n', err);
      });

    // use state to overide adoption status?
  };

  const renderAdopt = () => {};

  useEffect(() => {
    if (user !== null) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  useEffect(() => {}, [status]);

  return (
    <Box>
      <h1>{`${animal.name} would like to say hello!`}</h1>
      <img src={hasPhoto()} alt="img here" />
      <p>{`Species: ${animal.species}`}</p>
      <p>{`Breed: ${animal.breeds.primary}`}</p>
      <p>{`Age: ${animal.age}`}</p>
      <p>{`Gender: ${animal.gender}`}</p>
      <h3>About me:</h3>
      <p>{animal.description}</p>
      {hasTags()}
      {onAdoptionStatus()}
    </Box>
  );
}

export default PetView;

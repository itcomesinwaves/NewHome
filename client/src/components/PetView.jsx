import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// example pet object to render for mvp
const pet = {
  species: 'Cat',
  breed: 'Calico',
  gender: 'Female',
  size: 'Medium',
  coat: 'short',
  name: 'Bonnie',
  age: 'Adult',
  temperament: ['Friendly', 'Gentle', 'Affectionate'],
  shelterInfo: {
    email: 'adoptions@centralfallsanimals.org',
    address: {
      city: 'Central Falls',
      state: 'RI',
      postcode: '02863',
    },
  },
  adopted: false,
  image:
		'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57334144/1/?bust=1663026743&width=300',
};

function PetView(props) {
  // isloggedin
  const [loggedIn, setLoggedIn] = useState(false);

  // state from feed component
  const { state } = useLocation();
  const animal = state.animalsData;
  console.log('pet from feed', animal);

  // function to save/follow a pet
  const handleSavePet = (e) => {
    // check if user is logged in, and button id;
    if (!loggedIn) {
      window.alert('Please sign up/login');
    } else if (e.target.id === 'save') {
      // axios request for favoriting a pet
      console.log('testing save request');
    } else {
      // axios request for following a pet story
      console.log('testing follow request');
    }
    // alert user that the pet has been saved
  };

  // conditional rendering based on pet adoption status
  const onAdoptionStatus = () => {
    // if pet === adopted render follow button, render adoption stories
    if (pet.adopted) {
      // render follow button and pet stories
      return (
        <input
          type="button"
          id="follow"
          value="follow"
          onClick={(e) => handleSavePet(e)}
        />
      );
    }
    // render save button
    return (
      <input
        type="button"
        id="save"
        value="save"
        onClick={(e) => handleSavePet(e)}
      />
    );
  };

  return (
    <div>
      <h1>
        {animal.name}
        {' '}
        says hello
      </h1>
      <img src={pet.image} alt="img here" />
      <h3>About me:</h3>
      <p>{`Species: ${animal.species}`}</p>
      <p>{`Breed: ${animal.breeds.primary}`}</p>
      <p>{`Age: ${animal.age}`}</p>
      <h3>I&apos;m</h3>
      <ul>
        {pet.temperament.map((tag) => (
          <li key={`${tag}${pet.name}`}>{tag}</li>
        ))}
      </ul>
      {onAdoptionStatus()}
    </div>
  );
}

export default PetView;

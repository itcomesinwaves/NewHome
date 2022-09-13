import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function HomeFeed() {
  const [animals, getAnimals] = useState([]);

  const getAllAnimals = function() {
    axios.get(('/api')
      .then(() => {
        setAnimals()
      })
      .catch((err) => {
        console.error(err);
      }))
  }



  return (
    <>
      <h3>Welcome home Darth Maul ....</h3>
    </>
  )
}
export default HomeFeed;

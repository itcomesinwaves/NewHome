import React, { useState } from 'react';

function Search() {
  const [breed, setVal] = useState(() => '');
  const [hairLength, setHairLength] = useState(() => '');
  const [species, setSpecies] = useState(() => '');
  const [age, setAge] = useState(() => '');
  const [gender, setGender] = useState(() => '');

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
    };
    console.log(searchBy);
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

  return (
    <div id="search">
      <form onSubmit={submit}>
        Breed:
        <input type="text" value={breed} onChange={breedUpdate} />
        <select value={hairLength} onChange={hairUpdate}>
          <option value="">Hair length</option>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
        <select value={species} onChange={speciesUpdate}>
          <option value="">Species</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>
        <select value={age} onChange={ageUpdate}>
          <option value="">Age</option>
          <option value="baby">Baby</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
        <select value={gender} onChange={genderUpdate}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Search;

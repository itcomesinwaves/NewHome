import React, { useState } from 'react';

function Search() {
  const [breed, setVal] = useState(() => '');
  const [hairLength, setHairLength] = useState(() => '');
  const [type, setType] = useState(() => '');

  const breedUpdate = (event) => {
    setVal(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    console.log(breed.toLocaleLowerCase(), hairLength, type);
  };

  const hairUpdate = (event) => {
    setHairLength(event.target.value);
  };

  const typeUpdate = (event) => {
    setType(event.target.value);
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
        <select value={type} onChange={typeUpdate}>
          <option value="">Type </option>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Search;

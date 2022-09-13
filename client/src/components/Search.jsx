import React, { useState } from 'react';

function Search() {
  const [value, setVal] = useState(() => '');
  const [hairLength, setHairLength] = useState(() => '');

  const breedUpdate = (event) => {
    setVal(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    console.log(value, event);
  };

  const hairUpdate = (event) => {
    console.log(event);
  };

  return (
    <div id="search">
      <form onSubmit={submit}>
        Breed:
        <input type="text" value={value} onChange={breedUpdate} />
        <select hairlength={hairLength} onChange={hairUpdate}>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Search;

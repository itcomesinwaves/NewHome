import React from 'react';
import TextField from '@material-ui/core/TextField';

function AdoptedPet() {
  return (
    <div>
      <TextField label="Title" variant="standard" />
      <TextField
        id="standard-multiline-basic"
        label="Story"
        variant="standard"
      />
    </div>
  );
}

export default AdoptedPet;

import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';

function AdoptedPet() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  return (
    <Box
      component="form"
      sx={{
			  '& .MuiTextField-root': { m: 16, width: '30ch' },
			  display: 'inline-block',
      }}
      onSubmit={(e) => {
			  e.preventDefault();
			  console.log(`Title: ${title} \n Message: ${message}`);
			  axios
			    .post('/adoptionMessage', { post: { title, message } })
			    .then(() => console.log('success'))
			    .catch((err) => console.error(err));
      }}
    >
      <TextField
        label="Title"
        variant="standard"
        multiline
        maxRows={2}
        id="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <TextField
        id="message"
        label="Message"
        variant="standard"
        multiline
        maxRows={5}
        minRows={3}
        mb={2}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <br />
      <Button
        variant="contained"
        mt={2}
        sx={{ display: 'inline-block', margin: 'auto' }}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
}

export default AdoptedPet;

import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';

function AdoptedPet() {
  const [story, setStory] = useState('');
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
			  console.log(`Title: ${title} \n Story: ${story}`);
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
        id="Story"
        label="Story"
        variant="standard"
        multiline
        maxRows={5}
        minRows={3}
        mb={2}
        onChange={(e) => setStory(e.target.value)}
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

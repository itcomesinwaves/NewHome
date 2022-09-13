import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';

function AdoptedPet() {
  return (
    <Box
      component="form"
      sx={{
			  '& .MuiTextField-root': { m: 16, width: '30ch' },
			  display: 'inline-block',
      }}
    >
      <TextField label="Title" variant="standard" multiline maxRows={2} />
      <br />
      <TextField
        label="Story"
        variant="standard"
        multiline
        maxRows={5}
        minRows={3}
        mb={2}
      />
      <br />
      <br />
      <Button
        variant="contained"
        mt={2}
        sx={{ display: 'inline-block', margin: 'auto' }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default AdoptedPet;

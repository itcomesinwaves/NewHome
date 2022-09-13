import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';

function AdoptedPet() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);

  return (
    <Box
      component="form"
      id="post-form"
      sx={{
			  '& .MuiTextField-root': { width: '30ch' },
			  display: 'inline-block',
			  m: 2,
			  ml: 4,
			  'box-sizing': 'border-box',
      }}
      onSubmit={(e) => {
			  e.preventDefault();
			  console.log(`Title: ${title} \n Message: ${message}`);
			  axios
			    .post('/adoptionMessage', { post: { title, message } })
			    .then(() => {
			      console.log('success');
			      setTitle('');
			      setMessage('');
			      document.getElementById('post-form').reset();
			    })
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
      <label htmlFor="image-upload">
        <input
          accept="image/*"
          id="image-upload"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
					  const files = Array.from(e.target.files);
					  console.log(files);
					  files.forEach((f, i) => setImages([...images, URL.createObjectURL(f)]));
          }}
        />
        <Button variant="outlined" component="span">
          Upload Image
        </Button>
      </label>
      <br />
      {console.log(images)}
      {images.map((image) => (
        <div key={JSON.stringify(image)}>
          <br />
          <img src={image} height="200" alt="" />
          {' '}
          <br />
        </div>
      ))}
      <br />
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

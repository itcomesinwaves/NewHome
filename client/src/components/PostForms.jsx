import React, { useState } from 'react';
import {
  Box, TextField, Button, Card, CardMedia,
} from '@material-ui/core';
import axios from 'axios';

function PostForms() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  return (
    <Box
      component="form"
      id="post-form"
      sx={{
			  '& .MuiTextField-root': { width: '280px' },
			  display: 'inline-block',
			  m: 2,
			  ml: 4,
			  // border: '2px solid',
			  maxWidth: '280px',
      }}
      onSubmit={(e) => {
			  e.preventDefault();
			  axios
			    .post('/adoptionMessage', { post: { title, message, image } })
			    .then(() => {
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
          multiple={false}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
					  setImage(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <Button variant="outlined" component="span">
          Upload Image
        </Button>
      </label>
      <br />
      <br />
      <Card>
        <CardMedia component="img" src={image} image={image} alt="" />
      </Card>
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

export default PostForms;

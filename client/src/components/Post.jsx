import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function toBase64(arr) {
  // arr = new Uint8Array(arr) if it's an ArrayBuffer
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}
function Post({ post }) {
  const [image, setImage] = useState('');
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    if (post.image) {
      axios
        .post('/image', {
          post: {
            image: post.image,
            imageType: post.imageType,
          },
        })
        .then((data) => {
          setRendered(true);
          setImage(
            `data:${post.imageType};base64,${toBase64(data.data.Body.data)}`,
          );
        })
        .catch((err) => {
          console.error(err);
          return '';
        });
    } else {
      setRendered(true);
    }
  }, [rendered]);
  return (
    <Card>
      <CardMedia
        component="img"
        height="400"
        width="400"
        image={image}
        alt="card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
Post.propTypes = {
  post: PropTypes.object.isRequired,
};
export default Post;

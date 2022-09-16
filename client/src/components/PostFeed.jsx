import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Post from './Post.jsx';
import Loading from './Loading.jsx';
import App from './App.jsx';

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    axios
      .get('/feed/posts')
      .then(({ data: posts }) => {
        console.log(posts);
        setPosts(posts);
      })
      .then(() => {
        setRendered(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [rendered]);

  const updatePosts = () => {
    setTimeout(() => {
      axios
        .get('/feed/posts')
        .then(({ data }) => {
          setPosts(data.posts);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 6000000);
  };
  updatePosts();

  // loading feed
  const loadingFeed = () => {
    if (posts.length) {
      return posts.map((post) => (
        <div key={JSON.stringify(post)}>
          <Post post={post} />
          <br />
        </div>
      ));
    }
    return <Loading />;
  };

  return (
    <Box
      sx={{
			  maxWidth: 700,
			  maxHeight: 700,
			  '& .MuiTextField-root': { width: '280px' },
			  diplay: 'inline-block',
			  m: 'auto',
      }}
    >
      <Typography gutterBottom variant="h1" component="div">
        Welcome to NewHome
      </Typography>
      <p>Where you can give those little sonsofguns a new dang ole home</p>
      {loadingFeed()}
    </Box>
  );
}
export default PostFeed;

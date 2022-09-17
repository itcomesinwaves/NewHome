import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid } from '@mui/material';
import Post from './Post.jsx';
import Loading from './Loading.jsx';

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
          updatePosts();
        })
        .catch((err) => {
          console.error(err);
        });
    }, 6000000);
  };
  updatePosts();

  if (posts.length) {
    // console.log('single animal obj', animals[0]);
    return (
      <Box>
        <Typography variant="h3">Adoption Stories</Typography>
        <Grid
          container
          xs={8}
          xl={8}
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={8}
        >
          {posts.map((post) => (
            <Grid item key={JSON.stringify(post)} xs={6} xl={6}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  return <Loading />;
}
export default PostFeed;

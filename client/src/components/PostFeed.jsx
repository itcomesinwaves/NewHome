import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
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
    <Box>
      <Typography variant="h3">Adoption Stories</Typography>
      {loadingFeed()}
    </Box>
  );
}
export default PostFeed;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { Box, Card, Button } from '@mui/material';
import { UserContext } from '../UserContext.jsx';
// get user data using axios from google and display it on
// this page as a restricted page
// err takes user to login page
function Profile() {
  const {
    user, setUser, savedList, setSavedList,
  } = useContext(UserContext);
  const [haveUser, setHaveUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/proAuth')
      .then(({ data }) => {
        // console.log('data from proAuth', data);
        setUser(data);
        return data;
      })
      .then((data) => {
        setHaveUser(true);
        return axios.post('/user', {
          googleID: data.id,
          firstName: data.name.givenName,
          lastName: data.name.familyName,
          profilePhoto: null,
          email: data.emails[0].value,
        });
      })
      .then(({ data }) => {
        // console.log('inside data response from db', data);
      })
      .catch((err) => {
        console.error(err);
        return navigate('/login');
      });
    if (user !== null) {
      axios
        .get(`/pet/savePet/${user.id}`)
        .then(({ data }) => {
          setSavedList(data);
        })
        .catch((err) => {
          console.error('error on get/pet/savePet\n', err);
        });
    }
  }, [haveUser, navigate]); // return data stringified and stored in state as 'profile'-

  const Logout = () => {
    setUser(null);
    axios
      .get('/logout')
      .then((data) => {})
      .then(() => navigate('/login'))
      .catch((err) => {
        console.error(err);
      });
  };

  if (user === null) {
    return <h3>Must Sign In</h3>;
  }
  return (
    <Box
      sx={{
			  '&:hover': {
			    opacity: [0.9, 0.8, 0.7],
			  },
      }}
    >
      <Button
        variant="contained"
        mt={2}
        sx={{ display: 'inline-block', margin: 'auto' }}
        href="/login"
        onClick={Logout}
      >
        Logout
      </Button>
      <h1>{`Welcome back...${user.given_name}`}</h1>
      <p>
        <img src={user.picture} width={350} height={350} alt="am-broke" />
      </p>
      <div>
        <h3>fav list</h3>
      </div>
    </Box>
  );
}
export default Profile;

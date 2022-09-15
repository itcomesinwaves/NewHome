import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// get user data using axios from google and display it on
// this page as a restricted page
// err takes user to login page
function Profile() {
  const [profile, setProfile] = useState({});
  const [haveUser, setHaveUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('/proAuth')
      .then(({ data }) => setProfile(data))
      .then(() => {
        setHaveUser(true);
      })
      .catch((err) => {
        console.error(err);
        return navigate('/login');
      });
  }, [haveUser, navigate]); // return data stringified and stored in state as 'profile'-
  // the number 2 is just so the data can be spaced out a little to make it readable
  return <h1>{`welcome back..${profile.given_name}`}</h1>;
}
// JSON.stringify(profile, null, 2)
export default Profile;

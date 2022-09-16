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
      .then(({ data }) => {
        console.log('data from proAuth', data);
        setProfile(data);
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
        console.log('inside data response from db', data);
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
// async (accessToken, refreshToken, profile, done) => {
//   //get the user data from google
//   const newUser = {
//     googleId: profile.id,
//     displayName: profile.displayName,
//     firstName: profile.name.givenName,
//     lastName: profile.name.familyName,
//     image: profile.photos[0].value,
//     email: profile.emails[0].value
//   }

//   try {
//     //find the user in our database
//     let user = await User.findOne({ googleId: profile.id })

//     if (user) {
//       //If user present in our database.
//       done(null, user)
//     } else {
//       // if user is not preset in our database save user data to database.
//       user = await User.create(newUser)
//       done(null, user)
//     }
//   } catch (err) {
//     console.error(err)
//   }
// }

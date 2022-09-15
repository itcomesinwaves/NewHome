import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';

//get user data using axios from google and display it on this page as a restricted page
//err takes user to login page
function Profile() {
	const [profile, setProfile] = useState({});
	useEffect(() => {
		axios
			.get('/profile')
			.then((data) => {
				return setProfile(data);
			})
			.catch((err) => {
				console.error(err);
				return navigate('/login');
			});
	}); // return data stringified and stored in state as 'profile'- the number 2 is just so the data can be spaced out a little to make it readable
	return <div>{JSON.stringify(profile, null, 2)}</div>;
}

export default Profile;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Link, useNavigate, Outlet, useLocation,
} from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';

// axios get to get the authenticated page from the
// isAuthenticated route in the server then navigates to the react page 'profile'
// if err goes to the login page
function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [value, setVal] = useState(() => location);
  useEffect(() => {
    // axios
    // 	.get('/isAuthenticated')
    // 	.then(() => {
    // 		//navigate('/profile')
    // 	})
    // 	.catch((err) => {
    // 		console.error(err);
    // 		//return navigate('/login');
    // 	});
  });

  const handleChange = (event, newValue) => {
    setVal(newValue);
    navigate(newValue);
  };
  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        centered
      >
        <Tab value="/profile" label="Profile" />
        <Tab value="/search" label="Search" />
        <Tab value="/home" label="Home" />
        <Tab value="/login" label="Login" />
        <Tab value="/postForms" label="PostForms" />
        <Tab value="/postFeed" label="PostFeed" />
      </Tabs>
      <br />
      <Outlet />
    </Box>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// page that opens when refreshed/initialized
// goes to the google auth page to give user option to sign in with their google account
function Login() {
  const [clicked, setClicked] = useState(false);
  return (
    <Box>
      {clicked ? (
        <Navigate to="/profile" />
      ) : (
        <Box>
          <h1>Sign in</h1>
          <a href="/auth/google">Sign in with Google</a>
        </Box>
      )}
    </Box>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

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
          <Box>
            <h1>Sign in</h1>
            <Button
              variant="contained"
              mt={2}
              sx={{ display: 'inline-block', margin: 'auto' }}
              href="/login"
            >
              <a href="/auth/google">Sign In</a>
            </Button>
          </Box>
          <Box>
            <h1>Sign Up</h1>
            <Button
              variant="contained"
              mt={2}
              sx={{ display: 'inline-block', margin: 'auto' }}
              href="/login"
            >
              <a href="/auth/google">Sign Up</a>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Login;

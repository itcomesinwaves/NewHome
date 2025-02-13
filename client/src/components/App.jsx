import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// axios get to get the authenticated page from the
// isAuthenticated route in the server then navigates to the react page 'profile'
// if err goes to the login page
function App() {
  const navigate = useNavigate();
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
  return (
    <div>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/Search">Search</Link>
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/PostForms">PostForms</Link>
        <Link to="/PostFeed">PostFeed</Link>
      </nav>
      Howdy
    </div>
  );
}

export default App;

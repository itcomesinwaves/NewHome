import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/Search">Search</Link>
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
      Howdy
    </div>
  );
}

export default App;

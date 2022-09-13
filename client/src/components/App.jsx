import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/Search">Search</Link>
      </nav>
      Howdy
    </div>
  );
}

export default App;

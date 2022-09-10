import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
    <nav>
      <Link to='/'>App</Link>
      <Link to='/profile'>Profile</Link>
    </nav>
      Howdy
    </div>
    
  )
};

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Login() {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      {clicked ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <h1>Sign in</h1>
          <a href="/auth/google">Sign in with Google</a>
          {/* <div
						className="button google"
						onClick={() =>
							axios
								.get('/auth/google')
								.then(() => {
									setClicked(true);
								})
								.catch((err) => {
									console.error(err);
								})
						}
					>
						Sign in with Google
					</div> */}
        </>
      )}
    </div>
  );
}

export default Login;

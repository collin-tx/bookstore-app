import React from 'react';

const SignedIn = ({
  logout,
  user
}) => (
  <div>
    <small>Signed in as {user}</small>
    <button className="btn btn-secondary btn-sm" onClick={logout}>sign out</button>
  </div>
);

export default SignedIn;
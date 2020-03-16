import React from 'react';

const SignedIn = ({
  currentUser,
  logout
}) => {
  // const user = firebase.auth().currentUser;
  // const logout = () => firebase.auth().signout();
  return (
    <div>
      <h3>Signed in as {currentUser.displayName || currentUser.email}</h3>
      <p><small>not {currentUser.displayName}?</small><button className="btn btn-secondary btn-sm" onClick={logout}>sign out</button></p>
    </div>
  );
}

export default SignedIn;

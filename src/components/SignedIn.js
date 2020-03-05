import React from 'react';

const SignedIn = props => (
  <div>
    <small>Signed in as {props.user}</small>
    <button className="btn btn-secondary btn-sm">sign out</button>
  </div>
);

export default SignedIn;
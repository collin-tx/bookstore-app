import React from 'react';

const SignIn = props => {

  return (
    <form id="sign-in-form" onSubmit={props.handleCredentialsSubmit}>
      <div>
          email: <input type="text" onChange={props.handleEmail} value={props.email} />
      </div>
      <div className="pl-3">
          username: 
          <input type="text" onChange={props.handleUsername} value={props.username}
                maxLength={12} />
      </div>
      <button className="btn btn-secondary btn-sm">
          Sign In
      </button>
    </form>
  );
}

export default SignIn;
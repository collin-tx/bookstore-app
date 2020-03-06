import React from 'react';

const SignIn = props => {

  return (
    <form id="sign-in-form" onSubmit={(e) => props.handleSubmit(e)}>
      <div>
          email: <input type="text" onChange={props.handleEmail} value={props.email} />
      </div>
      <div className="pl-3">
          password: 
          <input type="password" onChange={props.handlePassword} value={props.password}
                maxLength={12}   
          />
      </div>
      <button className="btn btn-secondary btn-sm">
          Sign In
      </button>
    </form>
  );
}

export default SignIn;
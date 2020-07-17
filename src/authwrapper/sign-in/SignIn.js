import React from 'react';

const SignIn = ({
  email,
  handleEmail,
  handlePassword,
  handleSubmit,
  password,
  devCred
}) => (
  <form id="sign-in-form" className="form-horizontal auth-form" onSubmit={(e) => handleSubmit(e, email, password, password)}>
    <div class="auth-form--signin">
      <div className="form-group">
        <label htmlFor="email">email:</label>
        {/* <p>{devCred[0]}</p> */}
        <input type="text" onChange={handleEmail} value={email} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="password">password:</label>
        {/* <p>{devCred[1]}</p> */}
        <input type="password" onChange={handlePassword} value={password} className="form-control" />
      </div>
    </div>
    <button className="btn btn-secondary form-control">
      Sign In
    </button>
  </form>
);

export default SignIn;

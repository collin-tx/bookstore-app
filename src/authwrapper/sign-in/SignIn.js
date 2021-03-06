import React from 'react';

const SignIn = ({
  email,
  handleEmail,
  handlePassword,
  handleSubmit,
  password
}) => (
  <form id="auth-form" className="form-horizontal auth-form" onSubmit={(e) => handleSubmit(e)}>
    <div className="auth-form--signin">
      <div className="form-group">
        <label htmlFor="email">email:</label>
        <input type="text" onChange={handleEmail} value={email} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="password">password:</label>
        <input type="password" onChange={handlePassword} value={password} className="form-control" />
      </div>
    </div>
    <button className="btn btn-primary form-control">
      Sign In
    </button>
  </form>
);

export default SignIn;

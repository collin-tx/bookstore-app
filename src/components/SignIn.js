import React from 'react';

const SignIn = ({
  email,
  handleEmail,
  handlePassword,
  handleSubmit,
  password
}) => (
  <form id="sign-in-form" className="form-horizontal" onSubmit={(e) => handleSubmit(e, email, password, password)}>
    <div className="form-group">
      <label htmlFor="email">email:</label>
      <input type="text" onChange={handleEmail} value={email} className="form-control" />
    </div>
    <div className="form-group">
      <label htmlFor="password">password:</label>
      <input type="password" onChange={handlePassword} value={password} className="form-control" />
    </div>
    <button className="btn btn-secondary">
        Sign In
    </button>
  </form>
);

export default SignIn;

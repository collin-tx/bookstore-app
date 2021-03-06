import React from 'react';

const SignUp = ({
  email,
  handleEmail,
  handlePassword,
  handlePasswordVerify,
  handleSubmit,
  handleUsername,
  password,
  passwordVerify,
  username
}) => (
    <form id="auth-form" className="auth-form" onSubmit={e => handleSubmit(e, email, password, passwordVerify, true)}>
        <div className="auth-form--signup">
            <div className="form-group">
                <label htmlFor="username">username:</label>
                <input type="text" onChange={handleUsername} value={username} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="email">email:</label>
                <input type="text" onChange={handleEmail} value={email} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="password">password:</label>
                <input type="password" onChange={handlePassword} value={password} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="passwordVerify">confirm password:</label>
                <input type="password" onChange={handlePasswordVerify} value={passwordVerify} className="form-control" />
            </div>
        </div>
        <button className="btn btn-primary form-control">
            Sign Up
        </button>
    </form>
);

export default SignUp;

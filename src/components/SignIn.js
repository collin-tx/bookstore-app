import React from 'react';

const SignIn = ({
  email,
  error,
  handleEmail,
  handlePassword,
  handleSubmit,
  password
}) => {

  const renderErrors = () => {
    return error.length ? (
      <div className="error">
        <p>{error}</p>
      </div>
    ) : null
  }

  return (
    <form id="sign-in-form" className="form-horizontal" onSubmit={(e) => handleSubmit(e, email, password, password)}>
      {renderErrors()}
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
}

export default SignIn;

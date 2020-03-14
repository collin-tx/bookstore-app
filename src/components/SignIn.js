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
      <div>
        <p>{error}</p>
      </div>
    ) : null
  }

  return (
    <form id="sign-in-form" className="form-horizontal" onSubmit={(e) => handleSubmit(e)}>
      {renderErrors()}
      <div className="form-group">
        <label htmlFor="email">username:</label>
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



// TODO: add AUTH stuff
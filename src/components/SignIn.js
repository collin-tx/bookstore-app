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
    <form id="sign-in-form" onSubmit={(e) => handleSubmit(e)}>
      {renderErrors()}
      <div>
          email: <input type="text" onChange={handleEmail} value={email} />
      </div>
      <div className="pl-3">
          password: 
          <input type="password" onChange={handlePassword} value={password}
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

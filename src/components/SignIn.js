import React from 'react';

const SignIn = props => {

  const renderErrors = () => {
    return props.error.length ? (
      <div>
        <p>{props.error}</p>
      </div>
    ) : null
  }

  return (
    <form id="sign-in-form" onSubmit={(e) => props.handleSubmit(e)}>
      {renderErrors()}
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
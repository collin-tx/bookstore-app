import React from 'react';
import SignIn from '../sign-in';

const AuthWrapper = props => {

  const { firebase } = props;

  const  [ isNewUser, setIsNewUser ] = React.useState(true);

  const onClick = () => setIsNewUser(!isNewUser);

  return (
    <div className="authwrap-container">
      <SignIn firebase={firebase} isNewUser={isNewUser} />
        <div className="auth-form--switch">
        <p className="text-center">{isNewUser ? 'Already have an account?' : "Don't have an account?"}
        </p>
          <div className="">
          <button className="btn btn-secondary" onClick={onClick}>
            {isNewUser ? 'sign in' : 'sign up'}
          </button>
          </div>
        </div>
    </div>
  )
}

export default AuthWrapper;
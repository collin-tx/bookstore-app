import React from 'react';
import SignIn from '../sign-in';

const AuthWrapper = props => {

  const { firebase } = props;

  const  [ isNewUser, setIsNewUser ] = React.useState(true);

  console.log('isnew user', isNewUser);

  const onClick = () => setIsNewUser(!isNewUser);

  return (
    <div className="authwrap-container">
      <SignIn firebase={firebase} isNewUser={isNewUser} />
      <p className="text-center">{isNewUser ? 'Already have an account?' : "Don't have an account?"}
        <button className="modal-sign-link" onClick={onClick}>
          {isNewUser ? 'sign in' : 'sign up'}
        </button>
      </p>
    </div>
  )
}

export default AuthWrapper;
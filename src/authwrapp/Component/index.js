import React from 'react';
import SignIn from '../sign-in/SignIn';

const AuthWrapper = props => {

  const { firebase } = props;

  const  [ isNewUser, setIsNewUser ] = React.useState(true);

  return (
    <div className="authwrap-container">
      <SignIn firebase={firebase} isNewUser={isNewUser} />
      {
        isNewUser ? (
          <p>Already have an account? <button className="modal-sign-link" onClick={() => setIsNewUser(false)}>sign in</button></p>) : (
          <p>Don't have an account? <button className="modal-sign-link" onClick={() => setIsNewUser(true)}>sign up</button></p>)
      }
    </div>
  )
}

export default AuthWrapper;
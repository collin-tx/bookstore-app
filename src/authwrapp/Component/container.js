import React from 'react';
import SignIn from '../../containers/sign-in';

const AuthwrappContainer = props => {

  const { isNewUser, firebase, setIsNewUser, unwrap } = props;

  return (
    <div className="authwrap-container">
      <SignIn firebase={firebase} isNewUser={isNewUser} unwrap={unwrap} />
      {
        isNewUser ? (
          <p>Already have an account? <button className="modal-sign-link" onClick={() => setIsNewUser(false)}>sign in</button></p>) : (
          <p>Don't have an account? <button className="modal-sign-link" onClick={() => setIsNewUser(true)}>sign up</button></p>)
      }
    </div>
  )
}

export default AuthwrappContainer;
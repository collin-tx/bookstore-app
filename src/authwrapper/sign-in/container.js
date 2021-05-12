import React, { useState } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import SignIn from './SignIn'
import SignUp from './SignUp';

import { 
  signIn, 
  createUser as createUserAction
} from './actions';

import {
  getError,
  getUser
} from '../../library/selectors';

const SignInContainer = ({
  firebase,
  isNewUser
}) => {
  const dispatch = useDispatch();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordVerify, setPasswordVerify ] = useState('');
  const [ username, setUsername ] = useState('');

  const user = useSelector(getUser);
  const error = useSelector(getError);
  const isSignedIn = !!user?.uid;

  const handleEmail = e => {
    setEmail(e.target.value);
  }

  const handlePassword = e => {
    setPassword(e.target.value);
  }

  const handlePasswordVerify = e => {
    setPasswordVerify(e.target.value);
  }

  const handleUsername = e => {
    setUsername(e.target.value);
  }

  const loginUser = () => {
    isNewUser ? createUserAction(firebase, email, password, passwordVerify, username)(dispatch) :
    signIn(firebase, email, password)(dispatch)
  }

  const handleSubmit = e => {

    e.preventDefault();
    loginUser();
  }

  const renderSignUp = () => (
    <SignUp 
      email={email}
      error={error}
      handleEmail={handleEmail}
      handlePassword={handlePassword}
      handlePasswordVerify={handlePasswordVerify}
      handleSubmit={handleSubmit}
      handleUsername={handleUsername}
      password={password}
      passwordVerify={passwordVerify}
      username={username}
    /> 
  );

  const renderSignIn = () => (
    <SignIn
      user={user}
      isSignedIn={isSignedIn}
      email={email}
      error={error}
      handleEmail={handleEmail}
      handlePassword={handlePassword}
      handleSubmit={handleSubmit}
      password={password}
    />
  );

  const renderError = () => {
    return error && (
      <div className="bg-danger text-white p-1">
        {error?.message}
      </div>
    );
  }

  return (
    <div className="authwrapper">
      {renderError()}
      {isNewUser ? renderSignUp() : renderSignIn()}
    </div>
  );
}

export default SignInContainer;

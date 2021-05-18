import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Footer from '../../bookshop/components/Footer';
import Header from '../../bookshop/components/Header';
import Nav from '../../bookshop/components/Nav';

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
  );
}

const Auth = ({firebase}) => (
  <BrowserRouter>
    <Nav firebase={firebase}/>
    <Header />
    <AuthWrapper firebase={firebase} />
    <Footer />
  </BrowserRouter>
);

export default Auth;

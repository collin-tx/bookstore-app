import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Header from '../../bookshop/components/Header';
import Footer from '../../bookshop/components/Footer';
import Nav from '../../bookshop/components/Nav';

import AuthWrapper from './AuthWrapper';

import { unwrap } from '../sign-in/actions';
import { signOut, getHistory } from '../../actions';
import Bookshop from '../../bookshop';

const mapState = state => ({
  isSignedIn: state.isSignedIn,
});

const mapDispatch = dispatch => ({
  unwrap: fb => dispatch(unwrap(fb)),
  signOut: fb => dispatch(signOut(fb)),
  getHistory: fb => dispatch(getHistory(fb))
});


const App = props => {

  const { isSignedIn, firebase } = props;
  const user = firebase.auth().currentUser;
  
  
  const Auth = ({firebase}) => (
    <BrowserRouter>
      <Nav firebase={firebase} environment={'dev'} />
      <Header />
      <AuthWrapper
        firebase={firebase}
        />
      <Footer />
  </BrowserRouter>
  );
  
  let view = <Auth firebase={firebase} />;
  let viewRef = 'auth';

  // THIS CAN DEF BE IMPROVED 
  // TODO:  - useref
  if (!isSignedIn) {
    setInterval(() => {
      if (firebase.auth().currentUser) {
        view = <Bookshop firebase={firebase} />;
        viewRef = 'bookshop';
      } else {
        if (!firebase.auth().currentUser && viewRef === 'bookshop') {
          props.signOut(firebase);
          view = <Auth firebase={firebase} />;
          viewRef = 'auth';
        }
      }
    }, 200);
  }

  useEffect(() => {
    if (firebase.auth().currentUser) {
            props.unwrap(firebase);
            props.getHistory(firebase)
          } else {
            if (isSignedIn && !firebase.auth().currentUser) {
              props.signOut(firebase);
            }
          }
  });

  if (isSignedIn || !!user) {
    props.unwrap(firebase);
    view = <Bookshop firebase={firebase} />;
    viewRef = 'bookshop';
  } else {
    view = <Auth firebase={firebase} />;
    viewRef = 'auth';
  }

  return view;
}

export default connect(mapState, mapDispatch)(App);
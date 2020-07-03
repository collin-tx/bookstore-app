import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import Nav from '../../components/Nav.js';

import AuthWrapper from '../Component';

import { isSignedIn, signOut, storeHistory } from '../../actions';
import Bookshop from '../../bookshop';

const mapState = state => ({
  signedIn: state.signedIn
});

const mapDispatch = dispatch => ({
  isSignedIn: (fb) => dispatch(isSignedIn(fb)),
  signOut: fb => dispatch(signOut(fb)),
  storeHistory: () => dispatch(storeHistory())
});


const App = props => {

  const { signedIn, firebase } = props;
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
  if (!signedIn) {
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
            props.isSignedIn(firebase);
            props.storeHistory();
          } else {
            if (signedIn && !firebase.auth().currentUser) {
              props.signOut(firebase);
            }
          }
  });

  if (signedIn || !!user) {
    props.isSignedIn(firebase);
    view = <Bookshop firebase={firebase} />;
    viewRef = 'bookshop';
  } else {
    view = <Auth firebase={firebase} />;
    viewRef = 'auth';
  }

  return view;
}

export default connect(mapState, mapDispatch)(App);
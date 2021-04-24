import React, { useEffect } from 'react';
import { connect, useStore } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Header from '../../bookshop/components/Header';
import Footer from '../../bookshop/components/Footer';
import Nav from '../../bookshop/components/Nav';

import AuthWrapper from './AuthWrapper';

import { unwrap } from '../sign-in/actions';
import { signOut, getHistory } from '../../actions';
import { getFeaturedBook } from '../../entities/featured';
import Bookshop from '../../bookshop';

import { initialize } from '../../db-bookshop';

const mapState = state => ({
  isSignedIn: state.isSignedIn,
});

const mapDispatch = dispatch => ({
  unwrap: fb => dispatch(unwrap(fb)),
  signOut: fb => dispatch(signOut(fb)),
  getHistory: fb => dispatch(getHistory(fb)),
  getFeaturedBook: fb => dispatch(getFeaturedBook(fb))
});


const App = props => {
  const store = useStore();
  const { isSignedIn } = props;
  const firebase = initialize()(store.dispatch);
  const user = firebase.auth().currentUser;

  props.getFeaturedBook(firebase);

  const Auth = ({firebase}) => (
    <BrowserRouter>
      {/* in dev env, includes some helpful features  */}
      {/* <Nav firebase={firebase} environment={'dev'} /> */}
      <Nav firebase={firebase}/>
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
            props.getHistory(firebase);
          } else {
            if (isSignedIn && !firebase.auth().currentUser) {
              props.signOut(firebase);
            }
          }
  });

  // TODO:
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
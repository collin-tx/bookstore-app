import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import Auth from './AuthWrapper';

import { unwrap } from '../sign-in/actions';
import { signOut } from '../../entities/user';
import { getFeaturedBook } from '../../entities/featured';
import Bookshop from '../../bookshop';

import { initialize } from '../../db-bookshop';

const mapState = state => ({
  isSignedIn: state.isSignedIn,
});

const App = ({
  isSignedIn
}) => {

  const dispatch = useDispatch();
  const firebase = initialize()(dispatch);
  const user = firebase.auth().currentUser;
  
  let view = <Auth firebase={firebase} />;
  let viewRef = 'auth';

  useEffect(() => {
    dispatch(getFeaturedBook(firebase));
    if (firebase.auth().currentUser) {
      view = <Bookshop firebase={firebase} />;
      viewRef = 'bookshop';
    } else {
      if (!firebase.auth().currentUser && viewRef === 'bookshop') {
        dispatch(signOut(firebase));
        view = <Auth firebase={firebase} />;
        viewRef = 'auth';
      }
    }
  }, [isSignedIn]);

  // TODO:
  if (isSignedIn || !!user) {
    dispatch(unwrap(firebase));
    view = <Bookshop firebase={firebase} />;
    viewRef = 'bookshop';
  } else {
    view = <Auth firebase={firebase} />;
    viewRef = 'auth';
  }

  return view;
}

export default connect(mapState)(App);

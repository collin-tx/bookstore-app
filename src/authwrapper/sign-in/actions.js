import { 
  CREATE_USER,
  RENDER_ERROR,
  SIGN_IN,
  SYNC_CART,
  UNWRAP,
} from '../../library/constants';

import { removeError } from '../../library';

import { getHistory } from '../../entities/user';

import {
  storeQueryLog
} from '../../entities/books';

export const signIn = (firebase, email, password) => dispatch => {

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      const userId = user && user.uid;

      if (!!user) {
        dispatch({
          type: SIGN_IN,
          payload: user
        });

        dispatch(syncCart(firebase));
        dispatch(removeError());
        dispatch(getHistory(firebase, userId));
        dispatch(storeQueryLog(firebase));
      }
    })
    .catch(error => {
        dispatch({
          type: RENDER_ERROR,
          payload: {error}
        });
    })
  }


  export const unwrap = firebase => dispatch => {
  // relying on ST for now -- TODO: better solution for async options here
  //  solution: split it up - break down with new approach to sign in authrwarop whatejfijsdf

  // setTimeout(() => {
    const user = firebase.auth().currentUser;
    if (!!user) {
      dispatch(syncCart(firebase));
      dispatch(getHistory(firebase, user && user.uid));
      dispatch({
        type: UNWRAP,
        payload: user
      });
    }
  // }, 800);
}

export const createUser = (firebase, email, password, passwordVerify, username) => dispatch => {
  // create a new fb user auth credentials - clear any errors - create bookshop user in redux state - create User instance in db - render any errors

  if (password !== passwordVerify) {
    dispatch({
      type: RENDER_ERROR,
      payload: {
        error: {
          code: 'password not verified',
          message: 'Passwords do not match'
        }
      }
    });
    return 'false;'
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      // set display name
      user.updateProfile({
        displayName: username,
        // photoURL: "" -- maybe add the ability to add user pics later
      })

      dispatch(removeError());
      
      if (!!user) {
        dispatch({
          type: CREATE_USER,
          payload: user
        });
        // now create user in Users table in db
        const database = firebase.database();
        const userId = user && user.uid;

        database.ref('users/' + userId)
        .set({
          username,
          email,
          cart: [],
          userHistory: []
        });
      }
    })
    .catch(error => {
      dispatch({
        type: RENDER_ERROR,
        payload: {error}
      })
    });
}

// sync UI cart with FB cart
export const syncCart = firebase => dispatch => {
  const user = firebase.auth().currentUser;
  const cartRef = firebase.database().ref('users/' + (user?.uid) + '/cart');
  cartRef.on('value', async (snapshot) => {
    const fbCart = await snapshot.val();
    let fbCartArr = [];
    // eslint-disable-next-line 
    for (let id in fbCart){
      fbCartArr.push(fbCart[id]);
    }
    dispatch({
      type: SYNC_CART,
      payload: fbCartArr
    });
  });
}

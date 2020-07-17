import { 
  CREATE_USER,
  RENDER_ERROR,
  SIGN_IN,
  UNWRAP,
} from '../../actions/constants';

import {
  removeError,
  syncCart,
  getHistory,
  storeQueryLog
} from '../../actions';

export const signIn = (firebase, email, password) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      const userId = user && user.uid;

      if (!!user){
        dispatch({
          type: SIGN_IN,
          payload: user
        });
      }

      syncCart(firebase)(dispatch);
      dispatch(removeError());
      dispatch(getHistory(firebase, userId));
      dispatch(storeQueryLog(firebase));
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

export const createUser = (firebase, email, password, username) => async dispatch => {
  // create a new fb user auth credentials - clear any errors - create bookshop user in redux state - create User instance in db - render any errors
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      // set display name
      user.updateProfile({
        displayName: username,
        // photoURL: "" -- maybe add the ability to add user pics later
      })

      dispatch(removeError());
      
      if (!!user) {
        console.log('user from actions - created ', user);
        dispatch({
          type: CREATE_USER,
          payload: user
        });
        // now create user in Users table in db
        const database = firebase.database();
        const userId = user && user.uid;
        console.log('user id from actions - created ', userId);
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
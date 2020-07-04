// import firebase from 'firebase';
import { 
  CREATE_USER,
  FIREBASE,
  GET_HISTORY,
  LOADING,
  RENDER_ERROR,
  REMOVE_ERROR,
  SIGN_IN,
  SIGN_OUT,
  IS_SIGNED_IN,
  SYNC_CART,
} from '../../actions/constants';

import {
  getUser,
  getUserId,
  getHistory,
  getUserHistoryFB,
  getFirebase
} from '../../actions/selectors';

import {
  removeError,
  syncCart
} from '../../actions';

import store from '../../store';


export const signIn = (firebase, email, password) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = getUser(store.getState());
      const userId = user && user.uid;
      if (!!user){
        dispatch({
          type: SIGN_IN,
          payload: user
        });
      }
      syncCart(firebase)(dispatch);
      dispatch(removeError());
      const historyRef = firebase.database().ref('users/' + userId + '/purchaseHistory');
      historyRef.once('value')
        .then(snapshot => {
          const userHistory = snapshot.val();
          dispatch({
            type: GET_HISTORY,
            payload: userHistory
          })
        });
    })
    .catch(error => {
        dispatch({
          type: RENDER_ERROR,
          payload: {error}
        });
    })
  }


  export const isSignedIn = firebase => dispatch => {
  // relying on ST for now -- TODO: better solution for async options here
  //  solution: split it up - break down with new approach to sign in authrwarop whatejfijsdf

  setTimeout(() => {
    const user = getUser(store.getState());
    if (!!user) {
      // dispatch(storeHistory());
      const userId = user && user.uid;
      const cartRef = firebase.database().ref('users/' + userId + '/cart');
      cartRef.on('value', async (snapshot) => {
        const userCart = await snapshot.val();
        if (!!userCart){
          let fbCartArr = [];
          // eslint-disable-next-line
          for (let book in userCart){
            fbCartArr.push(userCart[book]);
          }
          dispatch({
            type: SYNC_CART,
            payload: fbCartArr
          });
        }
      });

      const historyRef = firebase.database().ref('users/' + userId + '/purchaseHistory');
      historyRef.once('value')
        .then(snapshot => {
          const userHistory = snapshot.val();
          dispatch({
            type: GET_HISTORY,
            payload: userHistory
          })
        });    
      dispatch({
        type: IS_SIGNED_IN,
        payload: user
      });
    }
  }, 800);
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
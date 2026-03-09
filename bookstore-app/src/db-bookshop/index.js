import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Stub returned when Firebase credentials are not configured.
// Prevents synchronous throws from firebase.auth() crashing the render tree.
const noopRef = {
  on: () => {},
  once: () => Promise.resolve({ val: () => null }),
  set: () => Promise.resolve(),
  push: () => Promise.resolve({ key: null }),
  update: () => Promise.resolve(),
  remove: () => Promise.resolve(),
};

const firebaseStub = {
  auth: () => ({
    currentUser: null,
    signInWithEmailAndPassword: () => Promise.reject({ code: 'auth/unavailable', message: 'Firebase not configured' }),
    createUserWithEmailAndPassword: () => Promise.reject({ code: 'auth/unavailable', message: 'Firebase not configured' }),
    signOut: () => Promise.resolve(),
  }),
  database: () => ({ ref: () => noopRef }),
  apps: [{}],
};

// initialize FB
export const initialize = () => dispatch => {
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

  if (!apiKey) {
    dispatch({ type: 'FIREBASE', payload: firebaseStub });
    return firebaseStub;
  }

  const firebaseConfig = {
    apiKey,
    authDomain: "books-app-249318.firebaseapp.com",
    databaseURL: "https://books-app-249318.firebaseio.com",
    projectId: "books-app-249318",
    storageBucket: "",
    messagingSenderId: "776537219409",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  dispatch({
    type: 'FIREBASE',
    payload: firebase
  });
  return firebase;
};
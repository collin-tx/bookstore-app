import firebase from 'firebase';


// initialize FB
export const initialize = () => dispatch => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
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
import firebase from 'firebase';
import { 
  EMPTY_CART,
  FETCH_BOOKS,
  FIREBASE,
  GET_HISTORY,
  LOADING,
  NO_BOOKS,
  RENDER_ERROR,
  REMOVE_ERROR,
  SIGN_OUT,
  SYNC_CART,
} from './constants';
import {
  getUser,
} from './selectors';
import store from '../store';


export const signOut = firebase => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT
  }
}

export const addBookToCart = (firebase, book) => dispatch => {

  // add book to users cart in FB here
  // books organized in cart by book.id

  const user = getUser(store.getState());
  if (!!user){
    const userId = user && user.uid;
    const database = firebase.database();
    database.ref('users/' + userId +'/cart/' + book.id)
      .set({
        book
    });
    const cartRef = database.ref('users/' + userId + '/cart');
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
}

export const removeBookFromCart = (firebase, book) => {
  // find the book and suck it outta there
    const user = getUser(store.getState());
    // const userId = getUserId(user);
    const userId = user && user.uid;
    const database = firebase.database();
    
    database.ref('users/' + userId + '/cart/' + book.id)
    .remove();
    
    let fbCartArr = [];
    const cartRef = database.ref('users/' + userId + '/cart');
    cartRef.on('value', async (snapshot) => {
      const fbCart = await snapshot.val();
      // eslint-disable-next-line
      for (let id in fbCart){
        fbCartArr.push(fbCart[id]);
      }
    });
      
    return {
      type: SYNC_CART,
      payload: fbCartArr
    }
}

export const checkOut = (firebase, order, subtotal) => dispatch => {
  const database = firebase.database();
  const user = getUser(store.getState());
  const userId = user && user.uid;
  console.log('checkout =----', order, subtotal);

  // push purchase details to purchaseHistory field on User  
  if (!!user){
    const path = `users/${userId}/purchaseHistory`;

    console.log('path', path);
    database.ref(path)
      .push({
        order,
        subtotal,
        date: Date()
      });
  }
  // empty cart and refresh userhistory
  dispatch(emptyCart(firebase));
  dispatch(getHistory(firebase, userId));
}

export const getHistory = (firebase, userId = null) => dispatch => {
  if (!userId) {
    const user = firebase.auth().currentUser;
    userId = user && user.uid;
  }
  const historyRef = firebase.database().ref('users/' + userId + '/purchaseHistory');
  historyRef.once('value')
    .then(snapshot => {
      const userHistory = snapshot.val();
      dispatch({
        type: GET_HISTORY,
        payload: userHistory
      })
    });
}

export const renderError = error => {
  return {
    type: RENDER_ERROR,
    payload: error
  }
}

export const removeError = () => {
  return {
    type: REMOVE_ERROR
  }
}

export const emptyCart = firebase => {
  const user = getUser(store.getState());
  // const userId = getUserId(user);
  const userId = user && user.uid;

  const database = firebase.database();

  database.ref('users/' + userId + '/cart/')
    .set([]);

  return {
    type: EMPTY_CART
  }
}

export const emptyCartUI = () => {
  return {
    type: EMPTY_CART
  }
}

// get books
const fetchRequest = searchTerm => fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=18`);

export const fetchBooks = searchTerm => async dispatch => {
  dispatch(removeError())
  await fetchRequest(searchTerm)
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({
        type: FETCH_BOOKS,
        payload: [data],
        searchTerm
      });
      if (data && !data.items){
        dispatch({
          type: NO_BOOKS
        });
      }
    })
    .catch(error => {
      dispatch({
        type: RENDER_ERROR,
        payload: {error}
      });
  });
}


// sync UI cart with FB cart
export const syncCart = firebase => dispatch => {
  const user = firebase.auth().currentUser;
  const cartRef = firebase.database().ref('users/' + (user && user.uid) + '/cart');
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

export const storeFirebase = firebase => ({
  type: FIREBASE,
  payload: firebase
});

export const isLoading = bool => ({
  type: LOADING,
  payload: bool
});

export const initialize = () => dispatch => {
  var firebaseConfig = {
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
    type: FIREBASE,
    payload: firebase
  });
  return firebase;
};
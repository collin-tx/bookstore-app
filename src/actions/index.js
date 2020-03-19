import { 
  ADD_BOOK,
  CHECK_OUT,
  CREATE_USER,
  EMPTY_CART,
  FETCH_BOOKS,
  RENDER_ERROR,
  REMOVE_BOOK,
  REMOVE_ERROR,
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_UI
} from './constants';


//action creators
export const signIn = (firebase, email, password) => async dispatch => {
  await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('signed in as', firebase.auth().currentUser.displayName, firebase.auth().currentUser);
      dispatch(removeError());
      const user = firebase.auth().currentUser;
      if (!!user){
        dispatch({
          type: SIGN_IN,
          payload: user
        });
      }
    })
    .catch(error => {
        dispatch({
          type: RENDER_ERROR,
          payload: {error}
        });
    });

    // connect with user in db too - i.e. find user in db
    // check whether user has items in user cart in db, populate the cart with them if so
    // check for past purchases to display somehow

}

export const signInUI = (email, username) => {
  const user = { email, displayName: username };
  return {
    type: SIGN_IN_UI,
    payload: user
  }
}

export const signOutUI = () => {
  return {
    type: SIGN_OUT
  }
}

export const createUser = (firebase, email, password, username) => async dispatch => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      // set display name
      user.updateProfile({
        displayName: username,
        // photoURL: ""
      })
    })
    .then(function() {
      dispatch(removeError());
    })
    .catch(error => {
      console.log('a createUser error, ', error);
      dispatch({
        type: RENDER_ERROR,
        payload: {error}
      })
    });
  const user = firebase.auth().currentUser;
  if (!!user) {
    console.log('created new user -- ', user.displayName, user);
    return dispatch({
      type: CREATE_USER,
      payload: user
    });
  }

  // create user in Users table in db
}

export const signOut = firebase => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT
  }
}

export const addBookToCart = (firebase, book) => {

  // add book to users cart in FB here
  // perhaps we just add it to the db and have the UI read from the db??
  return {
    type: ADD_BOOK,
    payload: book
  }
}

export const removeBookFromCart = (firebase, book) => {

  // remove book from users cart in FB here - same as above
  return {
    type: REMOVE_BOOK,
    payload: book
  }
}

export const renderError = error => {
  console.log({
    type: RENDER_ERROR,
    payload: error
  });
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

export const emptyCart = () => {
  return {
    type: EMPTY_CART
  }
}

export const checkout = (firebase, purchase) => {

  // push purchase to purchase history array in db
  return {
    type: CHECK_OUT
    // payload: purchase -- don't think I need this
    //  as far as UI is concerned, shouldn't this just empty the cart?
  }
}

// thunkstuff
const fetchRequest = searchTerm => fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=18`);

export const fetchBooks = searchTerm => async dispatch => {
  await fetchRequest(searchTerm)
    .then(response => {
      return response.json();
    }).then(data => {
        return dispatch({
          type: FETCH_BOOKS,
          payload: [data],
          searchTerm
        });
    })
    .catch(error => {
      console.log('error from actions', error);
  });
}
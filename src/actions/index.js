import { ADD_BOOK,
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
}

export const signOut = firebase => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT
  }
}

export const addBookToCart = book => {
  return {
    type: ADD_BOOK,
    payload: book
  }
}

export const removeBookFromCart = book => {
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
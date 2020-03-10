import { FETCH_BOOKS, SIGN_IN, SIGN_OUT } from './constants';


//action creators
export const signIn = user => {
  return {
    type: SIGN_IN,
    payload: user
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: {
      user: null
    }
  }
}

// thunks
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
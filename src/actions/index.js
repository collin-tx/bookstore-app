import store from '../store';
import { FETCH_BOOKS, SIGN_IN, SIGN_OUT } from './constants';


//action creators

export const fetchBooks = searchTerm => (dispatch, getState) => {
  // let url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`;
  let url = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + `&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`;
  // search term is coming up undefined every damn time -- what am I doing wrong?
  fetch(url)
    .then(response => {
      return response.json();
    }).then(data => {
      // this.setState({ books: [data], error: false });
        store.dispatch({
          type: FETCH_BOOKS,
          payload: [data]
        });
    })
    .catch(error => {
      // this.setState({ error, loading: false })
      console.log('error from actions', error);
  });
}

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
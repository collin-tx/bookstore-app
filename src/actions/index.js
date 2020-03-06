

//constants
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const DISPLAY_BOOK = 'DISPLAY_BOOK';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';


//action creators

export const fetchBooks = () => async (dispatch, getState) => {
  // need to get 'info' aka search term from state before then using it in this fx
  let url = `https://www.googleapis.com/books/v1/volumes?q=vonnegut&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`;
  await fetch(url)
    .then(response => {
      return response.json();
    }).then(data => {
      // this.setState({ books: [data], error: false });
        dispatch({
          type: FETCH_BOOKS,
          payload: [data]
        });
    })
    .catch(error => {
      // this.setState({ error, loading: false })
      console.log('error from actions', error);
  });
}


export const addBookToCart = book => {
  return {
    type: ADD_BOOK,
    payload: {
      book
    }
  }
};

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

//constants
export const ADD_BOOK = 'ADD_BOOK';
export const DISPLAY_BOOK = 'DISPLAY_BOOK';


//action creators
export const addBookToCart = book => {
  return {
    type: ADD_BOOK,
    payload: {
      book
    }
  }
};

export const displayBook = book => {
  return {
    type: DISPLAY_BOOK,
    payload: {
      book
    }
  }
};
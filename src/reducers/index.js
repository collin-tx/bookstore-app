import {
  ADD_BOOK,
  CREATE_USER,
  EMPTY_CART,
  FETCH_BOOKS,
  GET_HISTORY,
  REMOVE_BOOK,
  REMOVE_ERROR,
  RENDER_ERROR,
  SIGN_IN,
  SIGN_IN_UI,
  SIGN_OUT,
} from '../actions/constants';

const rootReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_BOOK:
      return {
        ...state,
        cart: [ ...(state.cart || []), action.payload ]
      }
    case CREATE_USER:
      return {
        ...state,
        signedIn: true,
        user: action.payload
      }
    case EMPTY_CART:
      return {
        ...state,
        cart: []
      }
    case FETCH_BOOKS: 
      return {
        ...state,
        books: action.payload[0].items,
        searchTerm: action.searchTerm
      }
    case GET_HISTORY:
      return {
        ...state,
        userHistory: action.payload
      }
    case REMOVE_BOOK: 
      return {
        ...state,
        cart: state.cart.filter(book => book !== action.payload)
      }
    case REMOVE_ERROR:
      return {
        ...state,
        error: null
      }
    case RENDER_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    case SIGN_IN:
      return {
        ...state,
        signedIn: true,
        user: action.payload
      }
    case SIGN_OUT:
      return {
        ...state,
        signedIn: false,
        user: null
      }
    case SIGN_IN_UI:
      return {
        ...state,
        signedIn: true,
        user: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;

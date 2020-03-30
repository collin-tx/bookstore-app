import {
  CREATE_USER,
  EMPTY_CART,
  FETCH_BOOKS,
  GET_HISTORY,
  REMOVE_ERROR,
  RENDER_ERROR,
  SIGN_IN,
  SIGN_IN_UI,
  SIGN_OUT,
  SYNC_CART
} from '../actions/constants';

const rootReducer = (state = [], action) => {
  switch(action.type) {
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
        user: null,
        cart: [],
        userHistory: []
      }
    case SIGN_IN_UI:
      return {
        ...state,
        signedIn: true,
        user: action.payload
      }
    case SYNC_CART:
      return {
        ...state,
        cart: action.payload
      }
    default:
      return {
        ...state,
        cart: [],
        user: null,
        signedIn: false
      }
  }
}

export default rootReducer;

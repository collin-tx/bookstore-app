import {
  CREATE_USER,
  EMPTY_CART,
  FETCH_BOOKS,
  GET_HISTORY,
  LOADING,
  NO_BOOKS,
  REMOVE_ERROR,
  RENDER_ERROR,
  SIGN_IN,
  IS_SIGNED_IN,
  SIGN_OUT,
  SYNC_CART,
  FIREBASE
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
        searchTerm: action.searchTerm,
        noBooks: false
      }
    case FIREBASE: {
      return {
        ...state,
        firebase: action.payload
      }
    }
    case GET_HISTORY:
      return {
        ...state,
        userHistory: action.payload
      }
    case LOADING: 
      return {
        ...state,
        loading: action.payload
      }

    case NO_BOOKS:
      return {
        ...state,
        noBooks: true
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
    case IS_SIGNED_IN:
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
        error: null,
        firebase: null,
        loading: false,
        signedIn: false,
        user: null
      }
  }
}

export default rootReducer;

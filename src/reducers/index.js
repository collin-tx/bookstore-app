import {
  CREATE_USER,
  EMPTY_CART,
  FETCH_BOOKS,
  FIREBASE,
  GET_FEATURED,
  GET_HISTORY,
  GET_QUERY_LOG,
  GET_SUGGESTIONS,
  LOADING,
  NO_BOOKS,
  REMOVE_ERROR,
  RENDER_ERROR,
  SIGN_IN,
  SIGN_OUT,
  SYNC_CART,
  UNWRAP
} from '../library/constants';

const rootReducer = (state = [], action) => {
  switch(action.type) {
    case CREATE_USER:
      return {
        ...state,
        isSignedIn: true,
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
        query: action.query,
        noBooks: false
      }
    case FIREBASE: {
      return {
        ...state,
        firebase: action.payload
      }
    }
    case GET_FEATURED:
      return {
        ...state,
        featured: action.payload
      }
    case GET_HISTORY:
      return {
        ...state,
        userHistory: action.payload
      }
    case GET_QUERY_LOG:
      return {
        ...state,
        queries: action.payload
      }
    case GET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload
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
        isSignedIn: true,
        user: action.payload
      }
    case SIGN_OUT:
      return {
        ...state,
        cart: [],
        error: null,
        isSignedIn: false,
        loading: false,
        queries: [],
        user: null
      }
    case UNWRAP:
      return {
        ...state,
        isSignedIn: true,
        user: action.payload
      }
    case SYNC_CART:
      return {
        ...state,
        cart: action.payload
      }
    default:
      return {
        books: [],
        cart: [],
        error: null,
        favorites: [],
        featured: {},
        firebase: null,
        isSignedIn: false,
        loading: false,
        queries: [],
        suggestions: [],
        user: null
      }
  }
}

export default rootReducer;

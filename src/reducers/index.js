import {
  CLEAR_SEARCH_FILTER,
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
  SEARCH_FILTER_CAN_BUY,
  SEARCH_FILTER_GENRE,
  SEARCH_FILTER_TYPE,
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
    case SEARCH_FILTER_CAN_BUY:
      return {
        ...state,
        searchFilter_canBuy: action.payload
      }
    case SEARCH_FILTER_GENRE:
      return {
        ...state,
        searchFilter_genre: action.payload

      }
    case SEARCH_FILTER_TYPE:
      return {
        ...state,
        searchFilter_type: action.payload
      }
    case CLEAR_SEARCH_FILTER:
      return {
        ...state,
        searchFilter_type: null,
        searchFilter_canBuy: false,
        searchFilter_genre: null,
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
        searchFilter_canBuy: false,
        searchFilter_genre: null,
        searchFilter_type: null,
        suggestions: [],
        user: null
      }
  }
}

export default rootReducer;

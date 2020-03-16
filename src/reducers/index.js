import { SIGN_IN, SIGN_OUT, FETCH_BOOKS, RENDER_ERROR, REMOVE_BOOK, ADD_BOOK, CREATE_USER, EMPTY_CART } from '../actions/constants';

  const rootReducer = (state = [], action) => {
    switch(action.type) {
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
      case CREATE_USER:
        return {
          ...state,
          signedIn: true,
          user: action.payload
        }
      case FETCH_BOOKS: 
        return {
          ...state,
          books: action.payload[0].items,
          searchTerm: action.searchTerm
        }
      case ADD_BOOK:
        return {
          ...state,
          cart: [ ...(state.cart || []), action.payload ]
        }
      case RENDER_ERROR:
        return {
          ...state,
          error: action.payload
        }
      case REMOVE_BOOK: 
        return {
          ...state,
          cart: state.cart.filter(book => book !== action.payload)
        }
      case EMPTY_CART:
        return {
          ...state,
          cart: []
        }
      default:
        return state;
      }
    }

export default rootReducer;

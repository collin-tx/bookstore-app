import { SIGN_IN, SIGN_OUT, FETCH_BOOKS, REMOVE_BOOK, ADD_BOOK } from '../actions/constants';

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
        case REMOVE_BOOK: 
          return {
            ...state,
            cart: state.cart.filter(book => book !== action.payload)
          }
        default:
          return state;
      }
    }

export default rootReducer;

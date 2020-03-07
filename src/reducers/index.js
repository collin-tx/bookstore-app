// import { combineReducers } from 'redux';
import { ADD_BOOK, SIGN_IN, SIGN_OUT } from '../actions';


// export const addingBookReducer = (state = [], action) => {
//   if (action.type === ADD_BOOK){
//     return [...state, action.payload];
//   }
//   return state;
// };

//   //?
//   export const dbReducer = (state = [], action) => {
//     if (action.type === 'DISPLAY_BOOK'){
//      return [...state, action.payload];
//     }
//     return state;
//   };
//no this is wrong, what is happening

  const rootReducer = (state = [], action) => {
    switch(action.type) {
      case ADD_BOOK:
        return [
          ...state,
          action.payload.book
        ]
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
        default:
          return state;
      }
    }

export default rootReducer;


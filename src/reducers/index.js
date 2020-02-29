import { combineReducers } from 'redux';
import { ADD_BOOK } from '../actions';


  export const addingBookReducer = (state = {}, action) => {
    if (action.type === ADD_BOOK){
      return action.payload;
    }
    return state;
  };

  export const displayBookReducer = (state = {}, action) => {
    if (action.type === ADD_BOOK){
      return action.payload;
    }
    return state;
  };




const reducers = combineReducers({
  addingBookReducer,
  displayBookReducer
});

export default reducers;
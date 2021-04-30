import { 
  FIREBASE,
  LOADING,
  RENDER_ERROR,
  REMOVE_ERROR,
} from './constants';

export const renderError = error => ({
  type: RENDER_ERROR,
  payload: error
});

export const removeError = () => ({
    type: REMOVE_ERROR
});

export const storeFirebase = firebase => ({
  type: FIREBASE,
  payload: firebase
});

export const isLoading = bool => ({
  type: LOADING,
  payload: bool
});

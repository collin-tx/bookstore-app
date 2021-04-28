import { 
  FIREBASE,
  GET_HISTORY,
  LOADING,
  RENDER_ERROR,
  REMOVE_ERROR,
  SIGN_OUT,
  SYNC_CART,
} from './constants';


export const signOut = firebase => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT
  }
}

export const getHistory = (firebase, userId = null) => dispatch => {
  if (!userId) {
    const user = firebase.auth().currentUser;
    userId = user && user.uid;
  }
  const historyRef = firebase.database().ref('users/' + userId + '/purchaseHistory');
  historyRef.once('value')
    .then(snapshot => {
      const userHistory = snapshot.val();
      dispatch({
        type: GET_HISTORY,
        payload: userHistory
      })
    });
}

export const renderError = error => {
  return {
    type: RENDER_ERROR,
    payload: error
  }
}

export const removeError = () => {
  return {
    type: REMOVE_ERROR
  }
}

// sync UI cart with FB cart
export const syncCart = firebase => dispatch => {
  const user = firebase.auth().currentUser;
  const cartRef = firebase.database().ref('users/' + (user && user.uid) + '/cart');
  cartRef.on('value', async (snapshot) => {
    const fbCart = await snapshot.val();
    let fbCartArr = [];
    // eslint-disable-next-line 
    for (let id in fbCart){
      fbCartArr.push(fbCart[id]);
    }
    dispatch({
      type: SYNC_CART,
      payload: fbCartArr
    });
  });
}

export const storeFirebase = firebase => ({
  type: FIREBASE,
  payload: firebase
});

export const isLoading = bool => ({
  type: LOADING,
  payload: bool
});

// export const getSuggestions = firebase => {
    // database.ref('suggestions/')
// }

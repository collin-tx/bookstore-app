import {
  SIGN_OUT,
  GET_HISTORY
} from '../../actions/constants';

export const signOut = firebase => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT
  }
}

export const getHistory = (firebase, userId = null) => dispatch => {
  if (!userId) {
    const user = firebase.auth().currentUser;
    userId = user?.uid;
  }

  firebase.database().ref('users/' + userId + '/purchaseHistory')
    .once('value')
    .then(snapshot => {
      const userHistory = snapshot.val();
      dispatch({
        type: GET_HISTORY,
        payload: userHistory
      })
    });
}

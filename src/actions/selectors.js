import { createSelector } from 'reselect';

export const getFirebase = (state = []) => state.firebase;
export const getUser = (state = []) => state.user ? state.user : state.firebase && state.firebase.auth().currentUser;
export const getHistory = (state = []) => state.userHistory ? state.userHistory : [];

export const getUserId = createSelector(getUser, user => user && user.uid);

export const getUserFB = createSelector(
  getFirebase,
  firebase => {
      return firebase.auth().currentUser
  }
);
  
export const getUserHistoryFB = createSelector(
  getFirebase,
  getUser,
  getUserId,
  (firebase, user, userId) => {
    if (user && firebase) {
      const historyRef = firebase.database().ref('users/' + userId + '/purchaseHistory');
      return historyRef.once('value')
        .then(snapshot => {
          const userHistory = snapshot.val();
          return userHistory || null;
        });
    }
  }
);


import { createSelector } from 'reselect';

export const getFirebase = (state = []) => state.firebase;
export const getUser = (state = []) => state.user ? state.user : state.firebase && state.firebase.auth().currentUser;
export const getHistory = (state = []) => state.userHistory ? state.userHistory : [];
export const getCart = (state = []) => state.cart ? state.cart : [];



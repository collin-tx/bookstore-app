export const getFirebase = (state = []) => state.firebase;
export const getUser = (state = []) => state.user ? state.user : {};
export const getHistory = (state = []) => state.userHistory ? state.userHistory : [];
export const getCart = (state = []) => state.cart ? state.cart : [];
export const getQueries = (state = []) => state.queries ? state.queries : [];
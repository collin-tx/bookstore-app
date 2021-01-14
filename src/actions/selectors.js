export const getCart = (state = []) => state.cart ? state.cart : [];
export const getFavorites = (state = []) => state.favorites ? state.favorites : [];
export const getFirebase = (state = []) => state.firebase;
export const getHistory = (state = []) => state.userHistory ? state.userHistory : [];
export const getQueries = (state = []) => state.queries ? state.queries : [];
export const getSuggestions = (state = []) => state.suggestions ? state.suggestions : [];
export const getUser = (state = []) => state.user ? state.user : {};

export const getBooks = (state = []) => state.books ? state.books : [];
export const getCart = (state = []) => state.cart ? state.cart : [];
export const getError = (state = []) => state.error ? state.error : null;
export const getFavorites = (state = []) => state.favorites ? state.favorites : [];
export const getFeatured = (state = []) => state.featured ? state.featured : {};
export const getFirebase = (state = []) => state.firebase;
export const getHistory = (state = []) => state.userHistory ? state.userHistory : [];
export const getIsSignedIn = (state = []) => state.signedIn ? true : false;
export const getNoBooksFound = (state = []) => state.noBooks ? true : false;
export const getQueries = (state = []) => state.queries ? state.queries : [];
export const getSuggestions = (state = []) => state.suggestions ? state.suggestions : [];
export const getUser = (state = []) => state.user ? state.user : {};
export const getLoading = (state = []) => state.loading ? true : false;

export const getSearchFilterParams = (state = []) => ({
  canBuy: state.searchFilter_canBuy,
  genre: state.searchFilter_genre,
  type: state.searchFilter_type,
});

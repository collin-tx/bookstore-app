import { GET_FEATURED } from "../../actions/constants";


export const getFeaturedBook = firebase => dispatch => {
  firebase.database().ref('featured').on('value', (snapshot) => {
    const data = snapshot.val();

    dispatch({
      type: GET_FEATURED,
      payload: data
    });
  });

  return false;
}

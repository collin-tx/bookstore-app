import { useSelector, useStore } from 'react-redux';

import { getQueries } from '../../actions/selectors';
import {
  removeError
} from '../../actions';
import {
  GET_QUERY_LOG,
  FETCH_BOOKS,
  NO_BOOKS,
  RENDER_ERROR
} from '../../actions/constants';

// get books
const fetchRequest = query => fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=18`);

export const fetchBooks = (query, firebase) => async dispatch => {
  dispatch(removeError())
  await fetchRequest(query)
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({
        type: FETCH_BOOKS,
        payload: [data],
        query
      });
      if (data && !data.items){
        dispatch({
          type: NO_BOOKS
        });
      }
    })
    .then(() => dispatch(logQuery(query, firebase)))
    .catch(error => {
      dispatch({
        type: RENDER_ERROR,
        payload: {error}
      });
  });
}

export const storeQueryLog = firebase  => dispatch => {
  const user = firebase.auth().currentUser;
  const queryLogRef = firebase.database().ref('users/' + (user && user.uid) + '/log');

  queryLogRef.on('value', async (snapshot) => {
    const log = await snapshot.val();
    let logArr = [];
    // eslint-disable-next-line 
    for (let q in log){
      // logArr.push(log[q]);
      logArr.push(log[q]);
    }
    dispatch({
      type: GET_QUERY_LOG,
      payload: logArr
    });
  });
}

export const logQuery = (query, firebase) => dispatch => {
  const user = firebase.auth().currentUser;
  if (!!user) {
    const userId = user && user.uid;
    const count = 'Q' + String(useSelector(state => getQueries(state)).length + 1);

    firebase.database().ref(`users/${userId}/log/${count}`)
      .set({
        query,
        date: Date.now()
    })
      .then(() => storeQueryLog(firebase))(dispatch);
  }
  return false;
}

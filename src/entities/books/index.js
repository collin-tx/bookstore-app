import {
  removeError, renderError
} from '../../actions';
import {
  GET_QUERY_LOG,
  FETCH_BOOKS,
  NO_BOOKS,
  RENDER_ERROR,
  SYNC_CART
} from '../../actions/constants';

// get books
const fetchRequest = query => fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=18`);

export const fetchBooks = (query, firebase, queries = []) => async dispatch => {
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
    .then(() => logQuery(query, firebase, queries)(dispatch))
    .catch(error => {
      dispatch({
        type: RENDER_ERROR,
        payload: {error}
      });
  });
}

export const storeQueryLog = firebase  => dispatch => {
  // refresh the store's query logs
  const user = firebase.auth().currentUser;
  const queryLogRef = firebase.database().ref('users/' + (user && user.uid) + '/log');

  queryLogRef.on('value', async (snapshot) => {
    const log = await snapshot.val();
    let logArr = [];
    // eslint-disable-next-line 
    for (let q in log){
      logArr.push(log[q]);
    }

    dispatch({
      type: GET_QUERY_LOG,
      payload: logArr
    });
  });
}

export const logQuery = (query, firebase, queries = []) => dispatch => {
  const userId = firebase.auth().currentUser?.uid;
  const queryId = 'Q' + String(queries.length + 1);

  firebase.database().ref(`users/${userId}/log/${queryId}`)
    .set({
      query,
      date: Date.now()
  }).catch(error => dispatch(renderError(error)));
    
  storeQueryLog(firebase)(dispatch);
}

export const addBookToCart = (firebase, book, user) => dispatch => {

  // add book to users cart in FB here
  // books organized in cart by book.id
  const db = firebase.database();
  const userId = user.uid;
  const cartRef = db.ref('users/' + userId + '/cart');


  db.ref('users/' + userId +'/cart/' + book.id)
    .set({
      book
    });

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

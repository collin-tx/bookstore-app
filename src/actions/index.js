import { 
  ADD_BOOK,
  CREATE_USER,
  EMPTY_CART,
  FETCH_BOOKS,
  GET_HISTORY,
  RENDER_ERROR,
  REMOVE_BOOK,
  REMOVE_ERROR,
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_UI
} from './constants';


//action creators
export const signIn = (firebase, email, password) => async dispatch => {
  await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(removeError());
      const user = firebase.auth().currentUser;
      if (!!user){
        dispatch({
          type: SIGN_IN,
          payload: user
        });
      }
    })
    .catch(error => {
        dispatch({
          type: RENDER_ERROR,
          payload: {error}
        });
    });

    // connect with user in db too - i.e. find user in db
    // check whether user has items in user cart in db, populate the cart with them if so
    // check for past purchases to display somehow

    const user = firebase.auth().currentUser;
    if (!!user){

      const cartRef = firebase.database().ref('users/' + user.uid + '/cart');
      const historyRef = firebase.database().ref('users/' + user.uid + '/purchaseHistory');
      let userCart, userHistory; 
      
      userCart = cartRef.on('value', (snapshot) => {
         userCart = snapshot.val();
      });
      
      historyRef.on('value', (snapshot) => {
         userHistory = snapshot.val();
      });


      setTimeout(() => { 
        // console.log('please', userCart, userHistory);
        if (!!userCart){
          // need to sync the redux cart with fb cart
          Object.keys(userCart).map(book => {
            return dispatch({
              type: ADD_BOOK,
              payload: userCart[book].book
            });
          })
        }
        // and put the purchase history somewhere
        dispatch({
          type: GET_HISTORY,
          payload: userHistory
        })
      }, 200);
      };
    
}

export const signInUI = (email, username) => {
  const user = { email, displayName: username };
  return {
    type: SIGN_IN_UI,
    payload: user
  }
}

export const signOutUI = () => {
  return {
    type: SIGN_OUT
  }
}

export const createUser = (firebase, email, password, username) => async dispatch => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      // set display name
      user.updateProfile({
        displayName: username,
        // photoURL: ""
      })
    })
    .then(function() {
      dispatch(removeError());
    })
    .catch(error => {
      // console.log('a createUser error, ', error);
      dispatch({
        type: RENDER_ERROR,
        payload: {error}
      })
    });
  const user = firebase.auth().currentUser;
  if (!!user) {
    // console.log('created new user -- ', user.displayName, user);
    dispatch({
      type: CREATE_USER,
      payload: user
    });

  // create user in Users table in db

  setTimeout(() => {
    const database = firebase.database();
    const user = firebase.auth().currentUser;
    const userId = user.uid;

    database.ref('users/' + userId)
      .set({
        username,
        email,
        cart: [],
        purchaseHistory: []
    });
  }, 1000);
  }
}

export const signOut = firebase => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT
  }
}

export const addBookToCart = (firebase, book) => {

  // add book to users cart in FB here
  // books organized in cart by book.id
  // perhaps we just add it to the db and have the UI read from the db??

  const user = firebase.auth().currentUser;
  if (!!user){
    const userId = user.uid;
    const database = firebase.database();

    database.ref('users/' + userId +'/cart/' + book.id)
      .set({
        book
    });
  }

  return {
    type: ADD_BOOK,
    payload: book
  }
}

export const removeBookFromCart = (firebase, book) => {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const database = firebase.database();

  database.ref('users/' + userId + '/cart/' + book.id)
  .remove();

  return {
    type: REMOVE_BOOK,
    payload: book
  }
}

export const checkOut = (firebase, order, subtotal) => dispatch => {
  // if I decide to track purchases from ppl not signed in, I could do something like this:
  // const user = props.firebase.auth().currentUser || { displayName: 'Guest', uid: Date.now() };
console.log('checkin out', firebase, order, subtotal);
  const user = firebase.auth().currentUser;
// push purchase details to purchaseHistory field on User  
  if (!!user){
    const userId = user.uid;
    const database = firebase.database();
    database.ref('users/' + userId +'/purchaseHistory/').once('value')
      .then(snapshot => {
        const index = (snapshot.val() ? snapshot.val().length : 1);
        const path = `users/${userId}/purchaseHistory/${index}`;
        database.ref(path)
          .set({
            order,
            subtotal,
            date: Date()
          });
      });
    // also need to empty user's fb cart
    setTimeout(() => {
      database.ref('users/' + userId + '/cart')
        .set([]);
    }, 200);
  }
  // refresh user history
  const historyRef = firebase.database().ref('users/' + user.uid + '/purchaseHistory');
  let userHistory;
  historyRef.on('value', (snapshot) => {
    userHistory = snapshot.val();
 });
  dispatch({
    type: GET_HISTORY,
    payload: userHistory
  });
  // and empty UI cart
  dispatch({
    type: EMPTY_CART
  });
}

export const renderError = error => {
  console.log({
    type: RENDER_ERROR,
    payload: error
  });
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

export const emptyCart = firebase => {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const database = firebase.database();

  database.ref('users/' + userId + '/cart/')
    .set([]);

  return {
    type: EMPTY_CART
  }
}

// thunkstuff
const fetchRequest = searchTerm => fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=18`);

export const fetchBooks = searchTerm => async dispatch => {
  await fetchRequest(searchTerm)
    .then(response => {
      return response.json();
    }).then(data => {
        return dispatch({
          type: FETCH_BOOKS,
          payload: [data],
          searchTerm
        });
    })
    .catch(error => {
      console.log('error from actions', error);
  });
}
import { 
  CREATE_USER,
  EMPTY_CART,
  FETCH_BOOKS,
  GET_HISTORY,
  NO_BOOKS,
  RENDER_ERROR,
  REMOVE_ERROR,
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_UI,
  SYNC_CART,
} from './constants';

// utilities

const getUser = firebase => {  
  let user = firebase.auth().currentUser;
  return user;
}

const getUserId = user => {
  return user && user.uid;
}

const getUserHistory = firebase => {
  const user = getUser(firebase);
  const userId = getUserId(user);
  let userHistory = null;
  const historyRef = firebase.database().ref('users/' + userId + '/purchaseHistory');
  return historyRef.once('value')
    .then(snapshot => {
      userHistory = snapshot.val();
      return userHistory ? userHistory : getUserHistory(firebase);
  });
}


//action creators
export const signIn = (firebase, email, password) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = getUser(firebase);
      if (!!user){
        dispatch({
          type: SIGN_IN,
          payload: user
        });
      }
      syncCart(firebase)(dispatch);
      getHistory(firebase)(dispatch);
      dispatch(removeError());
    })
    .catch(error => {
        dispatch({
          type: RENDER_ERROR,
          payload: {error}
        });
    })
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
        // photoURL: "" -- maybe add the ability to add user pics later
      })
    })
    .then(function() {
      dispatch(removeError());
    })
    .catch(error => {
      dispatch({
        type: RENDER_ERROR,
        payload: {error}
      })
    });
  const user = getUser(firebase);
  if (!!user) {
    dispatch({
      type: CREATE_USER,
      payload: user
    });

  // now create user in Users table in db

  setTimeout(() => {
    const database = firebase.database();
    const userId = getUserId(user);

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

export const addBookToCart = (firebase, book) => dispatch => {

  // add book to users cart in FB here
  // books organized in cart by book.id

  const user = getUser(firebase);
  if (!!user){
    const userId = getUserId(user);
    const database = firebase.database();
    database.ref('users/' + userId +'/cart/' + book.id)
      .set({
        book
    });
    const cartRef = database.ref('users/' + userId + '/cart');
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
}

export const removeBookFromCart = (firebase, book) => {
    const user = getUser(firebase);
    const userId = getUserId(user);
    const database = firebase.database();
    
    database.ref('users/' + userId + '/cart/' + book.id)
    .remove();
    
    let fbCartArr = [];
    const cartRef = database.ref('users/' + userId + '/cart');
    cartRef.on('value', async (snapshot) => {
      const fbCart = await snapshot.val();
      // eslint-disable-next-line
      for (let id in fbCart){
        fbCartArr.push(fbCart[id]);
      }
    });
      
    return {
      type: SYNC_CART,
      payload: fbCartArr
    }
}

export const checkOut = (firebase, order, subtotal) => dispatch => {
  const user = getUser(firebase);
  const database = firebase.database();
  const userId = getUserId(user);

  // push purchase details to purchaseHistory field on User  
  if (!!user){
    const path = `users/${userId}/purchaseHistory`;
    database.ref(path)
      .push({
        order,
        subtotal,
        date: Date()
      });
  }
  // empty cart and refresh userhistory
  emptyCart(firebase);
  setTimeout(() => {
    getHistory(firebase)(dispatch);
  }, 1000);
}

export const renderError = error => {
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
  const user = getUser(firebase);
  const userId = getUserId(user);
  const database = firebase.database();

  database.ref('users/' + userId + '/cart/')
    .set([]);

  return {
    type: EMPTY_CART
  }
}

export const emptyCartUI = () => {
  return {
    type: EMPTY_CART
  }
}

// get books
const fetchRequest = searchTerm => fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=18`);

export const fetchBooks = searchTerm => async dispatch => {
  await fetchRequest(searchTerm)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('bookdata', data);
      dispatch({
        type: FETCH_BOOKS,
        payload: [data],
        searchTerm
      });
      if (data && !data.items){
        dispatch({
          type: NO_BOOKS
        });
      }
    })
    .catch(error => {
      console.log('error from actions', error);
      // TODO: put this in state, render in home
  });
}

export const signInUI = firebase => dispatch => {
  // relying on ST for now -- clearly needs better solution
  console.log('signing in ui');
  setTimeout(() => {
    const user = getUser(firebase);
    if (!!user) {
      const userId = getUserId(user);
      const cartRef = firebase.database().ref('users/' + userId + '/cart');
      cartRef.on('value', async (snapshot) => {
        const userCart = await snapshot.val();
        if (!!userCart){
          let fbCartArr = [];
          // eslint-disable-next-line
          for (let book in userCart){
            fbCartArr.push(userCart[book]);
          }
          dispatch({
            type: SYNC_CART,
            payload: fbCartArr
          });
        }
      });
      dispatch({
        type: SIGN_IN_UI,
        payload: user
      });
    }
    console.log('signed in ui');
  }, 800);
}

// sync UI cart with FB cart
export const syncCart = firebase => dispatch => {
  console.log('syncing cart');
  const user = firebase.auth().currentUser;
  const cartRef = firebase.database().ref('users/' + (user && user.uid) + '/cart');
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
  console.log('synced cart');
}

// get a user's purchase history into Redux
export const getHistory = firebase => async dispatch => {
  console.log('getting history');
  await getUserHistory(firebase)
    .then(res => {
      Array.isArray(res) ? (
        res = res.filter(b => !!b)
      ) : res = Object.keys(res).map(k => res[k]);
      dispatch({
        type: GET_HISTORY,
        payload: res
      });
      return res;
    });
  console.log('got history');
}

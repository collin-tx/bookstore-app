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
    .then(() => {
      const user = firebase.auth().currentUser;
      const cartRef = firebase.database().ref('users/' + user.uid + '/cart');
      const historyRef = firebase.database().ref('users/' + user.uid + '/purchaseHistory');
      let userCart, userHistory; 
      
      cartRef.on('value', async (snapshot) => {
        userCart = await snapshot.val();
      });
      
      historyRef.on('value', (snapshot) => {
        userHistory = snapshot.val();
      });

      setTimeout(() => {
        if (!!userCart){
          console.log('fbcart', userCart);
          // need to sync the redux cart with fb cart
          Array.from(new Set(Object.keys(userCart))).map(book => {
            return dispatch({
              type: ADD_BOOK,
              payload: userCart[book].book
            });
          })
        }
        dispatch({
          type: GET_HISTORY,
          payload: userHistory
        })
      }, 1000);
    })
    .catch(error => {
        dispatch({
          type: RENDER_ERROR,
          payload: {error}
        });
    });
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
  const user = firebase.auth().currentUser;
  if (!!user) {
    dispatch({
      type: CREATE_USER,
      payload: user
    });

  // now create user in Users table in db

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

  const user = firebase.auth().currentUser;
  if (!!user){
    const userId = user.uid;
    const database = firebase.database();
    database.ref('users/' + userId +'/cart/' + book.id)
      .set({
        book
    });
  }
  // and add book to store cart too
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
  const user = firebase.auth().currentUser;
  const database = firebase.database();
  const userId = user && user.uid;

  // push purchase details to purchaseHistory field on User  
  if (!!user){
    setTimeout(() => {
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
    }, 500);
    // also need to empty user's fb cart
    setTimeout(() => {
      database.ref('users/' + userId + '/cart')
        .set([]);
    }, 200);
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
  }
  // and empty UI cart
  dispatch({
    type: EMPTY_CART
  });
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
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const database = firebase.database();

  database.ref('users/' + userId + '/cart/')
    .set([]);

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

export const signInUI = firebase => dispatch => {
  
  setTimeout(() => {
    const user = firebase.auth().currentUser;
    if (!!user) {
      const cartRef = firebase.database().ref('users/' + user.uid + '/cart');
      cartRef.on('value', async (snapshot) => {
        const userCart = await snapshot.val();
        if (!!userCart){
          // need to sync the redux cart with fb cart
          Array.from(new Set(Object.keys(userCart))).map(book => {
            return dispatch({
              type: ADD_BOOK,
              payload: userCart[book].book
            });
          })
        }
      });
      dispatch({
        type: SIGN_IN_UI,
        payload: user
      });
    }
  }, 400);
}


// get a user's purchase history 
export const getHistory = firebase => async dispatch => {

  setTimeout(() => {

    const getUser = () => {  
        let user = firebase.auth().currentUser;
        if (!user){
          setTimeout(() => {
            user = firebase.auth().currentUser;
          }, 400);
        }
      return user;
    }
  
    const getUserId = () => {
      let user = getUser();
      let userId = user && user.uid;
      return user && (userId ? userId : getUserId());
    }
  
    const getUserHistory = async () => {
          let userId = await getUserId();

          const historyRef = await firebase.database().ref('users/' + userId + '/purchaseHistory');

            historyRef.on('value', async (snapshot) => {
              let userHistory = await snapshot.val() && snapshot.val().filter(i => !!i);
              dispatch({
                type: GET_HISTORY,
                payload: userHistory
              });
            });
    }
    getUserHistory();
  }, 400);
}
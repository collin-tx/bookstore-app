import {
  EMPTY_CART,
  SYNC_CART
} from '../../actions/constants';

import {getHistory} from '../../actions';


export const removeBookFromCart = (firebase, book, user) => {
  const userId = user.uid;
  const db = firebase.database();
  
  // find the book and suck it outta there
  db.ref('users/' + userId + '/cart/' + book.id).remove();
    
  let fbCartArr = [];
  const cartRef = db.ref('users/' + userId + '/cart');
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

export const checkOut = (firebase, cart, subtotal) => dispatch => {
  const db = firebase.database();
  const user = firebase.auth().currentUser;
  const userId = user?.uid;

  // push purchase details to purchaseHistory field on User  
  db.ref(`users/${userId}/purchaseHistory`)
    .push({
      order: cart,
      subtotal,
      date: Date()
    });

  // empty cart and refresh userhistory
  dispatch(emptyCart(firebase, user));
  dispatch(getHistory(firebase, userId));
}

export const emptyCart = (firebase, user) => {
  const userId = user.uid;
  const db = firebase.database();

  db.ref('users/' + userId + '/cart/').set([]);

  return {
    type: EMPTY_CART
  }
}



// from the time I tried to OOP == let this be a warning
// export const CartManager = (firebase, book = {}, user = {}, cart = [], subtotal = null) => dispatch => ({
//   getDatabase: () => firebase.database(),
//   getUserId: () => user?.uid,
//   removeBookFromCart: () => {
//     this.getDatabase().ref('users/' + this.getUserId() + '/cart/' + book.id).remove();
//     this.syncCart();
//   },
//   syncCart: () => {
//     let fbCartArr = [];
//     this.getDatabase().ref('users/' + this.getUserId() + '/cart')
//       .on('value', async (snapshot) => {
//         const fbCart = await snapshot.val();
//         // eslint-disable-next-line
//         for (let id in fbCart){
//           fbCartArr.push(fbCart[id]);
//         }
//       });
//     dispatch({
//       type: SYNC_CART,
//       payload: fbCartArr
//     });
//   },
//   checkout: () => {
//     this.getDatabase().ref(`users/${this.getUserId()}/purchaseHistory`)
//     .push({
//       cart,
//       subtotal,
//       date: Date()
//     });
//     dispatch(this.emptyCart(firebase, user));
//     dispatch(getHistory(firebase, this.getUserId()));
//   },
//   emptyCart: () => {
//     this.getDatabase().ref('users/' + this.getUserId() + '/cart/').set([]);
//     dispatch({
//       type: EMPTY_CART
//     });
//   }
// });

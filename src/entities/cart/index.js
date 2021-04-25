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

export const checkOut = (firebase, order, subtotal) => dispatch => {
  const db = firebase.database();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  // push purchase details to purchaseHistory field on User  
  const path = `users/${userId}/purchaseHistory`;

  db.ref(path)
    .push({
      order,
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

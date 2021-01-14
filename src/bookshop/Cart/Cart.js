import React from 'react';
import { connect } from 'react-redux';

import Subtotal from './Subtotal';

import Checkout from '../Checkout/modal';
import UserHistory from '../UserHistory/modal';

const Cart = ({
  cart = [],
  booksInCart = [],
  checkoutBooks = [],
  emptyCart = () => {},
  firebase = {},
  subtotal,
  user
}) => (
  <div id="cart">
    <h2 id="cart-title" className="text-center m-5">Cart</h2>
    {
      cart && subtotal > 0 && 
        <div id="checkout-div">
          {/* <p style={{ padding: '0', margin: '0' }}><small>{user || 'Guest'}</small></p> */}
          <Checkout subtotal={subtotal} books={checkoutBooks} firebase={firebase} />
          <p id="subtotal" className="text-right">
          <Subtotal subtotal={subtotal} />
          </p>
        </div>
    }

    {
      (!cart || !cart.length) && (
        <div id="empty-cart-div">
          <p>Once you add items to the cart, you'll see them here.</p>
        </div>)
    }

    <ul className="list-group">
      {booksInCart}
    </ul>

    {
      cart && subtotal > 0 &&
        <div>
          <div id="checkout-bottom" className="p-2">
            <button className="btn btn-secondary ml-1 mr-1 text-white" onClick={() => emptyCart()}>empty cart</button>
            {
              !!user && <UserHistory firebase={firebase} />
            }
            <Checkout subtotal={subtotal} books={checkoutBooks} firebase={firebase} />
          </div>
          <p className="text-right mr-3">Shopping as {user ? user : 'guest'}</p>
        </div>
    }

  </div>
);

const mapState = state => ({
    userHistory: state.userHistory,
    cart: state.cart
});

export default connect(mapState)(Cart);

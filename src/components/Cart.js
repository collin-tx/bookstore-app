import React from 'react';
import { Checkout } from './Checkout';
import Subtotal from './Subtotal';

const Cart = ({
    cart = [],
    booksInCart = [],
    checkoutBooks = [],
    subtotal,
    user
}) => (
    <div id="cart">
        <h2 id="cart-title" className="text-center m-5">Cart</h2>
        {
            cart && subtotal > 0 && 
                <div id="checkout-div">
                    <p style={{ padding: '0', margin: '0' }}><small>{user || 'Guest'}</small></p>
                    <Checkout subtotal={subtotal} books={checkoutBooks} user={user} />
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
                <div id="checkout-bottom">
                    <Checkout subtotal={subtotal} books={checkoutBooks} user={user} />
                    <p>Checkout as {user ? user : 'guest'}</p>
                </div>
               
        }
    </div>
);

export default Cart;

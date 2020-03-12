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
    <div>
        <h2 id="cart-title" className="text-center m-5">Cart</h2>
        <p><small>{user || 'Guest'}</small></p>
        {
            cart && 
                <div id="checkout-div">
                    <p id="subtotal" className="">
                        <Subtotal subtotal={subtotal} />
                    </p>
                    <Checkout subtotal={subtotal} books={checkoutBooks} user={user} />
                </div>
        }
        {
            (!cart || !cart.length) && <p>Once you add items to the cart, you'll see them here.</p>
        }
        <ul className="list-group">
            {booksInCart}
        </ul>
    </div>
);

export default Cart;

import React from 'react';
import { Checkout } from './Checkout';
import { Subtotal } from './Subtotal';

const Cart = props => (
    <div>
        <h2 id="cart-title" className="text-center m-5">Cart</h2>
        <p><small>{props.user || 'Guest'}</small></p>
        {props.cart ? 
            <div id="checkout-div">
                <p id="subtotal" className="">
                    <Subtotal subtotal={props.subtotal} />
                </p>
                <Checkout subtotal={props.subtotal} books={props.checkoutBooks} user={props.user} />
            </div> : ''}

        {props.cart < 1 ? <p>Once you add items to the cart, you'll see them here.</p> : ''}
        <ul className="list-group">
            {props.booksInCart}
        </ul>
    </div>
);

export default Cart;

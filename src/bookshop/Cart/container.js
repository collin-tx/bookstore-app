import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartBook from './CartBook';
import Cart from './Cart';

import {
    emptyCart as emptyCartAction,
    removeBookFromCart
} from '../../entities/cart';

import { generateKey } from '../../utils/helper';
import {
    getCart,
    getFirebase,
    getHistory,
    getUser 
} from '../../actions/selectors';

const CartContainer = () => {

    const dispatch = useDispatch();

    const user = useSelector(getUser);
    const cart = useSelector(getCart);
    const userHistory = useSelector(getHistory);
    const firebase = useSelector(getFirebase);
    
    const handleRemove = book => {
        dispatch(removeBookFromCart(firebase, book, user));
    }

    const handleEmptyCart = () => {
        dispatch(emptyCartAction(firebase, user));
    }

    const booksInCart = cart.map(record => (
        <CartBook title={record.book.volumeInfo.title} book={record.book}
            author={record.book.volumeInfo.authors && record.book.volumeInfo.authors[0]}
            img={record.book.volumeInfo.imageLinks && record.book.volumeInfo.imageLinks.thumbnail}
            subtitle={record.book.volumeInfo.subtitle && record.book.volumeInfo.subtitle}
            description={record.book.volumeInfo.description && record.book.volumeInfo.description}
            key={record.book.id} id={record.book.etag} remove={handleRemove}
            link={record.book.volumeInfo.infoLink} preview={record.book.volumeInfo.previewLink}
            price={record.book.saleInfo.listPrice.amount}
        />
    ));
            
    const priceArray = cart.length && cart.map(book => book.book.saleInfo.listPrice.amount);
    const subtotal = priceArray ? priceArray.reduce((a,b) => a + b) : 0;

    const checkoutBooks = (
        <div>
            <table className="checkout-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !!cart && cart.map((book, index) => {
                            return (
                                <tr key={generateKey(book.id)}>
                                    <td>{book.book.volumeInfo.title}</td>
                                    <td>{book.book.volumeInfo.authors && book.book.volumeInfo.authors[0]}</td>
                                    <td>${book.book.saleInfo.listPrice.amount.toFixed(2)}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <br />
            <div className="flex-column">
                <p><b>Subtotal</b></p>
                <p>${subtotal.toFixed(2)}</p>
            </div>

        </div>   
    );

    return (
        <Cart 
            booksInCart={booksInCart}
            cart={cart}
            checkoutBooks={checkoutBooks}
            emptyCart={handleEmptyCart}
            firebase={firebase}
            subtotal={subtotal}
            user={(user && user.displayName)}
            userHistory={userHistory}
        />
    );
}

export default CartContainer;

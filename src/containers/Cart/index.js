import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartBook from '../../components/CartBook';
import Cart from '../../components/Cart';
import { generateKey } from '../../utils/helper';
import { removeBookFromCart } from '../../actions';

export class CartContainer extends Component {  

    handleRemove = book => {
        this.props.removeBookFromCart(book);
    }

    render() {

        let booksInCart = !!this.props.cart && this.props.cart.map(book => {
            return (
                <CartBook title={book.volumeInfo.title} book={book}
                author={book.volumeInfo.authors && book.volumeInfo.authors[0]}
                img={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
                subtitle={book.volumeInfo.subtitle && book.volumeInfo.subtitle}
                description={book.volumeInfo.description && book.volumeInfo.description}
                key={book.id} id={book.etag} remove={this.handleRemove}
                link={book.volumeInfo.infoLink} preview={book.volumeInfo.previewLink}
                price={book.saleInfo.listPrice.amount}
                 />
            )
        });

        let checkoutBooks = !!this.props.cart && this.props.cart.map((book, index) => {
            return (
            <li className="list-group-item" key={generateKey(index)}>
                <p>{book.volumeInfo.title} 
                    <b className="float-right">${book.saleInfo.listPrice.amount.toFixed(2)}</b>
                </p>
            </li>
            )
        })

        let priceArray = this.props.cart && this.props.cart.length && this.props.cart.map(book => book.saleInfo.listPrice.amount);
        const subtotal = priceArray && priceArray.reduce((a,b) => a + b);        

        return (
            <Cart 
                user={this.props.user}
                cart={this.props.cart}
                subtotal={subtotal}
                checkoutBooks={checkoutBooks}
                booksInCart={booksInCart}
            />
        )
    }
}

const mapState = state => {
    return {
        user: state.user,
        cart: state.cart
    }
}

const mapDispatch = dispatch => ({ 
    removeBookFromCart: book => dispatch(removeBookFromCart(book))
});

export default connect(mapState, mapDispatch)(CartContainer);

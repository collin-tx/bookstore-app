import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartBook from './CartBook';
import Cart from './Cart';
import { emptyCart, removeBookFromCart } from '../../actions';
import { generateKey } from '../../utils/helper';

export class CartContainer extends Component {  

    handleRemove = book => {
        this.props.removeBookFromCart(this.props.firebase, book);
    }

    emptyCart = () => {
        this.props.emptyCart(this.props.firebase);
    }

    render() {
        let booksInCart = !!this.props.cart && this.props.cart.map(record => {
            return (
                <CartBook title={record.book.volumeInfo.title} book={record.book}
                author={record.book.volumeInfo.authors && record.book.volumeInfo.authors[0]}
                img={record.book.volumeInfo.imageLinks && record.book.volumeInfo.imageLinks.thumbnail}
                subtitle={record.book.volumeInfo.subtitle && record.book.volumeInfo.subtitle}
                description={record.book.volumeInfo.description && record.book.volumeInfo.description}
                key={record.book.id} id={record.book.etag} remove={this.handleRemove}
                link={record.book.volumeInfo.infoLink} preview={record.book.volumeInfo.previewLink}
                price={record.book.saleInfo.listPrice.amount}
                />
            );
        });
            
        let priceArray = this.props.cart && this.props.cart.length && this.props.cart.map(book => book.book.saleInfo.listPrice.amount);
        const subtotal = priceArray ? priceArray.reduce((a,b) => a + b) : 0;

        let checkoutBooks = (
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
                            !!this.props.cart && this.props.cart.map((book, index) => {
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
        cart={this.props.cart}
        checkoutBooks={checkoutBooks}
        emptyCart={this.emptyCart}
        firebase={this.props.firebase}
        subtotal={subtotal}
        user={(this.props.user && this.props.user.displayName)}
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
    removeBookFromCart: (fb, book) => dispatch(removeBookFromCart(fb, book)),
    emptyCart: fb => dispatch(emptyCart(fb))
});

export default connect(mapState, mapDispatch)(CartContainer);

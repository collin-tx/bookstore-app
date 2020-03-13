import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartBook from '../../components/CartBook';
import Cart from '../../components/Cart';
import { generateKey } from '../../utils/helper';
import { emptyCart, removeBookFromCart } from '../../actions';

export class CartContainer extends Component {  

    handleRemove = book => {
        this.props.removeBookFromCart(book);
    }

    emptyCart = () => {
        this.props.emptyCart();
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

        let checkoutBooks = (
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
                                <tr>
                                    <td>{book.volumeInfo.title}</td>
                                    <td>{book.volumeInfo.authors && book.volumeInfo.authors[0]}</td>
                                    <td>${book.saleInfo.listPrice.amount.toFixed(2)}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>      
            );

        let priceArray = this.props.cart && this.props.cart.length && this.props.cart.map(book => book.saleInfo.listPrice.amount);
        const subtotal = priceArray ? priceArray.reduce((a,b) => a + b) : 0;       

        return (
            <Cart 
                booksInCart={booksInCart}
                cart={this.props.cart}
                checkoutBooks={checkoutBooks}
                emptyCart={this.emptyCart}
                subtotal={subtotal}
                user={this.props.user}
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
    removeBookFromCart: book => dispatch(removeBookFromCart(book)),
    emptyCart: () => dispatch(emptyCart())
});

export default connect(mapState, mapDispatch)(CartContainer);

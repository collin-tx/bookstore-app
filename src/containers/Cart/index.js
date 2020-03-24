import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartBook from '../../components/CartBook';
import Cart from '../../components/Cart';
import { emptyCart, removeBookFromCart } from '../../actions';

export class CartContainer extends Component {  

    handleRemove = book => {
        this.props.removeBookFromCart(this.props.firebase, book);
    }

    emptyCart = () => {
        this.props.emptyCart(this.props.firebase);
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
            
        let priceArray = this.props.cart && this.props.cart.length && this.props.cart.map(book => book.saleInfo.listPrice.amount);
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
                                    <tr key={book.id}>
                                        <td>{book.volumeInfo.title}</td>
                                        <td>{book.volumeInfo.authors && book.volumeInfo.authors[0]}</td>
                                        <td>${book.saleInfo.listPrice.amount.toFixed(2)}</td>
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
    emptyCart: (fb) => dispatch(emptyCart(fb))
});

export default connect(mapState, mapDispatch)(CartContainer);

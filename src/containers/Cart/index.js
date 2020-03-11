import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartBook from '../../components/CartBook';
import Cart from '../../components/Cart';
import { generateKey } from '../../utils/helper';
import { removeBookFromCart } from '../../actions';
import store from '../../store';

export class CartContainer extends Component {  

    handleRemove = book => {
        this.props.removeBookFromCart(book);
    }

    render() {
        console.log('cartprops!', this.props);
        console.log('STATEfromCART', store.getState());

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

        let priceArray = this.props.cart && this.props.cart.map(book => book.saleInfo.listPrice.amount);
        const subtotal = priceArray && priceArray.reduce((a,b) => a + b);        

        return (
    //         <div>
    //             <h2 id="cart-title" className="text-center m-5">Cart</h2>
    //             <p><small>{this.props.user || 'Guest'}</small></p>
    //             {this.prop.cart.length > 0 ? 
    //                 <div id="checkout-div">
    //                     <p id="subtotal" className="">
    //                         <Subtotal subtotal={subtotal} />
    //                     </p>
    //                     <Checkout subtotal={subtotal} books={checkoutBooks} user={this.props.user} />
    //                 </div> : ''}

    //             {this.state.cartItems.length < 1 ? <p>Once you add items to the cart, you'll see them here.</p> : ''}
    //             <ul className="list-group">
    //                 {booksInCart}
    //             </ul>
    //         </div>
    //     )
    // }
    <Cart 
        user={this.props.user}
        cart={this.props.cart}
        subtotal={subtotal}
        checkoutBooks={checkoutBooks}
        booksInCart={booksInCart}
    />
        )
};
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

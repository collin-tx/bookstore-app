import React, { Component } from 'react';
import CartBook from './CartBook';
import { Checkout } from './Checkout';
import { Subtotal } from './Subtotal';
import { generateKey } from '../utils/helper';
import { connect } from 'react-redux';

export class Cart extends Component {  
    state = {
        cartItems: [],
        cart: {}
    }

    componentDidMount(){
        let database = this.props.firebase;

        this.setState({ database })

        let cart = database.ref('cart');
        this.setState({ cart });

        cart.on('value', response => {
            const cartData = response.val();

            const cartItems = [];
        
            // eslint-disable-next-line
            for (let index in cartData){
                cartItems.push({
                key: index,    
                book: cartData[index]
                    });
            }

            this.setState({ cartItems });
        });
    }

    handleRemove = (e, key) => {
        this.state.database.ref('cart/' + key).remove();
    }

    render() {
        let booksInCart = this.state.cartItems.map(book => {
            return (
                <CartBook title={book.book.book.volumeInfo.title} book={book}
                author={book.book.book.volumeInfo.authors && book.book.book.volumeInfo.authors[0]}
                img={book.book.book.volumeInfo.imageLinks && book.book.book.volumeInfo.imageLinks.thumbnail}
                subtitle={book.book.book.volumeInfo.subtitle && book.book.book.volumeInfo.subtitle}
                description={book.book.book.volumeInfo.description && book.book.book.volumeInfo.description}
                key={book.book.book.id} id={book.book.book.etag} remove={this.handleRemove}
                link={book.book.book.volumeInfo.infoLink} preview={book.book.book.volumeInfo.previewLink}
                price={book.book.book.saleInfo.listPrice.amount}
                 />
            )
        });

        let checkoutBooks = this.state.cartItems.map((book, index) => {
            return (
            <li className="list-group-item" key={generateKey(index)}>
                <p>{book.book.book.volumeInfo.title} 
                    <b className="float-right">${book.book.book.saleInfo.listPrice.amount.toFixed(2)}</b>
                </p>
            </li>
            )
        })

        let priceArray = this.state.cartItems[0] && this.state.cartItems.map(book => book.book.book.saleInfo.listPrice.amount);
        const subtotal = priceArray && priceArray.reduce((a,b) => a + b);        

        return (
            <div>
                <h2 id="cart-title" className="text-center m-5">Cart</h2>
                <p><small>{this.props.user || 'Guest'}</small></p>
                {this.state.cartItems.length > 0 ? 
                    <div id="checkout-div">
                        <p id="subtotal" className="">
                            <Subtotal subtotal={subtotal} />
                        </p>
                        <Checkout subtotal={subtotal} books={checkoutBooks} user={this.props.user} />
                    </div> : ''}

                {this.state.cartItems.length < 1 ? <p>Once you add items to the cart, you'll see them here.</p> : ''}
                <ul className="list-group">
                    {booksInCart}
                </ul>
            </div>
        )
    }
};

const mapState = state => {
    return {
        user: state.user
    }
}

export default connect(mapState)(Cart);

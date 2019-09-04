import React, { Component } from 'react';
import firebase from 'firebase';
import CartBook from './CartBook';

export class Cart extends Component {
    
    state = {
        cartItems: [],
        cart: {}
    }

    componentDidMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyBo9Ly_nArNncTpVgPpBFZsP5Wg6VkT0rI",
            authDomain: "books-app-249318.firebaseapp.com",
            databaseURL: "https://books-app-249318.firebaseio.com",
            projectId: "books-app-249318",
            storageBucket: "",
            messagingSenderId: "776537219409",
            appId: "1:776537219409:web:4dd05baa355d57c2"
          };
          
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

          let database = firebase.database();

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
          })
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

        let priceArray = this.state.cartItems[0] && this.state.cartItems.map(book => book.book.book.saleInfo.listPrice.amount);
        let subtotal = priceArray && priceArray.reduce((a,b) => a + b);

        console.log(priceArray && subtotal);

        return (
            <div>
                <h2 id="cart-title" className="text-center m-5">Cart</h2>
                {this.state.cartItems.length > 0 ? <p id="subtotal" className="text-right mr-5">subtotal: $ {subtotal}<br/><button className="btn btn-success">checkout</button></p> : ''}
                {this.state.cartItems.length < 1 ? <p>Once you add items to the cart, you'll see them here.</p> : ''}
                <ul className="list-group">
                    {booksInCart}
                </ul>
            </div>
        )
    }
}

export default Cart

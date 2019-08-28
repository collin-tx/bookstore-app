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

          let cart = database.ref('cart');
          this.setState({ cart });

          cart.on('value', response => {
              const cartData = response.val();
              //console.log(cartData);

              const cartItems = [];

              for (let index in cartData){
                  cartItems.push(cartData[index]);
              }

              this.setState({ cartItems });
          })
    }
    
    render() {

        let booksInCart = this.state.cartItems.map(book => {
            return (
                <CartBook title={book.book.volumeInfo.title} 
                author={book.book.volumeInfo.authors && book.book.volumeInfo.authors[0]}
                img={book.book.volumeInfo.imageLinks && book.book.volumeInfo.imageLinks.thumbnail}
                subtitle={book.book.volumeInfo.subtitle && book.book.volumeInfo.subtitle}
                description={book.book.volumeInfo.description && book.book.volumeInfo.description}
                key={book.book.id} id={book.book.etag}
                 />
            )
        })

        return (
            <div>
                this is the cart
                <ul className="list-group">
                    {booksInCart}
                </ul>
            </div>
        )
    }
}

export default Cart

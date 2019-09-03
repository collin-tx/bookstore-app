import React, { Component } from 'react'
import Book from './Book';
import key from './key';
import { handleErrors } from '../utils/helper';
import firebase from 'firebase';


export class Books extends Component {
    
    state = {
        term: '',
        books: [],
        loading: false,
        error: '',
        cart: [],
        adding: false
    }
    
    componentDidMount(){
        this.getBook('javascript');

        var firebaseConfig = {
            apiKey: "AIzaSyBo9Ly_nArNncTpVgPpBFZsP5Wg6VkT0rI",
            authDomain: "books-app-249318.firebaseapp.com",
            databaseURL: "https://books-app-249318.firebaseio.com",
            projectId: "books-app-249318",
            storageBucket: "",
            messagingSenderId: "776537219409",
            appId: "1:776537219409:web:4dd05baa355d57c2"
          };


          // added conditional, otherwise it results in error -- Firebase App named '[DEFAULT]' already exists (app/duplicate-app)
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

          let database = firebase.database();
          let cart = database.ref('cart');
          this.setState({ cart });

    }

    handleChange = (e) => {
        this.setState({ term: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getBook(this.state.term);
        this.setState({ term: '' })
    }

    addToCart = (e, index) => {
        this.setState({ adding: true })
        const bookToAdd = this.state.books[0].items[index];
        this.state.cart.push({
            book : bookToAdd,
        });
        setTimeout( ()=> {
            this.setState({ adding: false });
        }, 1000);
    }

    getBook = (info) => {
        this.setState( () => {
            return { loading: true }
        });
        const apiKey = key;
        let url = `https://www.googleapis.com/books/v1/volumes?q=${info}&key=${apiKey}`;
        fetch(url).then(handleErrors)
        .then(response => {
            return response.json();
        }).then(data => {
            this.setState({ books: [data], error: false })
        })
        .catch(error => {
            this.setState({ error, loading: false })
        })


        setTimeout( () => {
            this.setState({ loading: false });
        }, 500);
    }

    render() {
        let bookList = this.state.books[0] && this.state.books[0].items.map((book, index) => {
            return (
            <Book title={book.volumeInfo.title} 
            author={book.volumeInfo.authors && book.volumeInfo.authors[0]} 
            category={book.volumeInfo.categories && book.volumeInfo.categories[0]} 
            description={book.volumeInfo.description}
            date={book.volumeInfo.publishedDate} 
            img={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
            infoLink={book.volumeInfo.infoLink} 
            preview={book.volumeInfo.previewLink} 
            id={book.id} index={index}
            key={book.etag} 
            pageCount={book.volumeInfo.pageCount} 
            subtitle={book.volumeInfo.subtitle && book.volumeInfo.subtitle}
            addToCart={this.addToCart} />
            )
        });

        return (
            <div>
                <form onSubmit={this.handleSubmit} id="form">
                    <input type='text' value={this.state.term} onChange={this.handleChange} 
                    placeholder="Search for a book..." className="form-control" />
                    <button type='submit' className="btn btn-primary" id="submit"><i className="fas fa-search"></i> Search</button>
                </form>

                { this.state.adding && 
                    <div id="adding-div" className="text-center">
                        <p>Adding book to cart...</p>
                    </div>
                }
                
                { this.state.loading &&
                    <div id="loading-div" className="text-center">
                        <p>Loading...</p>
                    </div>
                }

                { this.state.error && 
                    <div id="error-div" className="text-center">
                        <p>No Books found</p>
                    </div>
                }

                <ul className="list-group" id="bookList">
                    {bookList}
                </ul>

            </div>
        )
    }
}

export default Books

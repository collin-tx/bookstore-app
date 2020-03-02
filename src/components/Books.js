import React, { Component } from 'react'
import Book from './Book';
import quotes from '../quotes.json';
import { handleErrors, getQuote } from '../utils/helper';

export class Books extends Component {
    
    state = {
        term: '',
        books: [],
        loading: false,
        error: '',
        cart: [],
        adding: false,
        searched: false
    }
    
    componentDidMount(){
          let database = this.props.firebase;
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
            return { loading: true,  searched: true }
        });
        let url = `https://www.googleapis.com/books/v1/volumes?q=${info}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=18`;
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
        let bookList = this.state.books[0] && this.state.books[0].items 
            && this.state.books[0].items.map((book, index) => {
            return (
            <Book title={book.volumeInfo.title} 
            author={book.volumeInfo.authors && book.volumeInfo.authors[0]} 
            category={book.volumeInfo.categories && book.volumeInfo.categories[0]} 
            description={book.volumeInfo.description}
            price={book.saleInfo.listPrice && book.saleInfo.listPrice.amount} 
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
            <div className="container-fluid" >
                <form onSubmit={this.handleSubmit} id="search-form">
                    <input type='text' value={this.state.term} onChange={this.handleChange} 
                    placeholder="Search for a book..." className="form-control" id="search-input" />
                    <button type='submit' className="btn btn-primary" id="search-submit"><i className="fas fa-search"></i> Search</button>
                </form>

                {!this.state.searched &&
                    <div>
                        <h3 className="text-center m-5">Welcome</h3>
                        <h5 className="text-center m-3">Your search results will display here. <br /> Happy Reading!</h5>
                    </div>
                }

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

                { this.state.searched && this.state.books[0] && this.state.books[0].totalItems < 1 &&
                    <div id="error-div" className="text-center">
                        <p>No Books found</p>
                    </div>
                }

                <ul className="list-group" id="bookList">
                    {bookList}
                </ul>

                <p id="quote">{getQuote(quotes)}</p>

                {!this.state.bookList ? <div id="spacer-div" /> : ''}

            </div>
        )
    }
}

export default Books;

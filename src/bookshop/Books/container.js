import React, { Component } from 'react'
import { connect } from 'react-redux';

import Book from '../Book';
import Books from './Books';

import { quote } from '../../utils/helper';
import { fetchBooks, addBookToCart } from '../../actions';

export class BooksContainer extends Component {
    
    state = {
        term: '',
        loading: false,
        error: '',
        cart: [],
        adding: false,
        searched: false
    }

    handleChange = e => {
        this.setState({ term: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.getBooks(this.state.term);
        this.setState({ term: '' });
    }

    addToCart = (e, index) => {
        this.setState({ adding: true })
        const bookToAdd = this.props.books[index];
        this.setState({ adding: false });
        this.props.addBookToCart(this.props.firebase, bookToAdd);
    }

    getBooks = query => {
        this.setState(() => {
            return { loading: true,  searched: true }
        });
        this.props.fetchBooks(query)
        .then(() => {
            this.setState({ loading: false });
        })
        .catch(error => {
            this.setState({ error, loading: false });
        });
    }

    render() {
        let allBooks = this.props.books && this.props.books.map((book, index) => {
            return (
                <Book title={book.volumeInfo.title} book={book}
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
                      addToCart={this.addToCart}
                />
            );
        });
        return (
            <Books
            adding={this.state.adding}
            books={this.props.books}
            bookList={allBooks}
            loading={this.state.loading}
            noBooks={this.props.noBooks}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit} 
            quote={quote}
            searched={this.state.searched}
            term={this.state.term}
            />
        );
    }
}

const mapState = state => ({
    books: state.books,
    query: state.term,
    cart: state.cart,
    noBooks: state.noBooks,
    error: state.error
});

const mapDispatch = dispatch => ({ 
    fetchBooks: query => dispatch(fetchBooks(query)),
    addBookToCart: (fb, book) => dispatch(addBookToCart(fb, book))
});

export default connect(mapState, mapDispatch)(BooksContainer);

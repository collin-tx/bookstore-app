import React, { Component } from 'react'
import BookContainer from '../Book';
import Books from '../../components/Books';
import { quote } from '../../utils/helper';
import { fetchBooks, addBookToCart } from '../../actions';
import { connect } from 'react-redux';


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
        setTimeout( ()=> {
            this.setState({ adding: false });
        }, 1000);
        this.props.addBookToCart(this.props.firebase, bookToAdd);
    }

    getBooks = searchTerm => {
        this.props.fetchBooks(searchTerm)
        .catch(error => {
            this.setState({ error, loading: false });
        });
        this.setState( () => {
            return { loading: true,  searched: true }
        });

        setTimeout( () => {
            this.setState({ loading: false });
        }, 1000);
    }

    render() {
        let allBooks = this.props.books && this.props.books.map((book, index) => {
            return (
                <BookContainer title={book.volumeInfo.title} book={book}
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
            quote={quote}
            bookList={allBooks}
            onSubmit={this.handleSubmit} 
            term={this.state.term}
            onChange={this.handleChange}
            searched={this.state.searched}
            books={this.props.books}
            loading={this.state.loading}
            />
        );
    }
}

const mapState = state => ({
    books: state.books,
    searchTerm: state.term,
    cart: state.cart
});

const mapDispatch = dispatch => ({ 
    fetchBooks: searchTerm => dispatch(fetchBooks(searchTerm)),
    addBookToCart: (fb, book) => dispatch(addBookToCart(fb, book))
});

export default connect(mapState, mapDispatch)(BooksContainer);

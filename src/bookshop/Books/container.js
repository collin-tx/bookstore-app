import React from 'react'
import { connect, useSelector } from 'react-redux';

import Book from '../Book';
import Books from './Books';

import { quote } from '../../utils/helper';
import { addBookToCart } from '../../actions';
import { fetchBooks } from '../../entities/search';
import { getQueries } from '../../actions/selectors';

const BooksContainer = props => {

    const [ term, setTerm ] = React.useState('');
    const [ adding, setAdding ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ searched, setSearched ] = React.useState(false);
    const queries = useSelector(getQueries) ?? [];

    const handleChange = e => setTerm(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        getBooks(term);
        setTerm('');
    }

    const addToCart = (e, index) => {
        setAdding(true);
        const bookToAdd = props.books[index];
        props.addBookToCart(props.firebase, bookToAdd);
        setAdding(false);
    }

    const getBooks = query => {
        setLoading(true);
        setSearched(true);
        props.fetchBooks(query, props.firebase, queries).then(() => {
            setLoading(false);
        });
    }

    let allBooks = props.books?.map((book, index) => {
        return (
            <Book 
                title={book.volumeInfo.title} book={book}
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
                addToCart={addToCart}
            />
        );
    });

    return (
        <Books
            adding={adding}
            books={props.books}
            bookList={allBooks}
            loading={loading}
            noBooks={props.noBooks}
            onChange={handleChange}
            onSubmit={handleSubmit} 
            quote={quote}
            searched={searched}
            term={term}
        />
    );
}

const mapState = state => ({
    books: state.books,
    query: state.term,
    cart: state.cart,
    noBooks: state.noBooks,
    error: state.error
});

const mapDispatch = dispatch => ({ 
    fetchBooks: (query, fb, queries) => dispatch(fetchBooks(query, fb, queries)),
    addBookToCart: (fb, book) => dispatch(addBookToCart(fb, book))
});

export default connect(mapState, mapDispatch)(BooksContainer);

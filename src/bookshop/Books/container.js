import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Book from '../Book';
import Books from './Books';

import { quote } from '../../utils/helper';
import { 
    addBookToCart,
    fetchBooks 
} from '../../entities/books';
import { 
    getBooks,
    getFirebase,
    getQueries,
    getUser,
    getNoBooksFound
} from '../../library/selectors';

const BooksContainer = () => {

    const [ term, setTerm ] = React.useState('');
    const [ adding, setAdding ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ searched, setSearched ] = React.useState(false);
    
    const queries = useSelector(getQueries) ?? [];
    const books = useSelector(getBooks);
    const user = useSelector(getUser);
    const noBooks = useSelector(getNoBooksFound);
    const firebase = useSelector(getFirebase);

    const dispatch = useDispatch();

    const handleChange = e => setTerm(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        searchForBooks(term);
        setTerm('');
    }

    const addToCart = (e, index) => {
        setAdding(true);
        addBookToCart(firebase, books[index], user)(dispatch);
        setAdding(false);
    }

    const searchForBooks = query => {
        setLoading(true);
        setSearched(true);
        fetchBooks(query, firebase, queries)(dispatch);
        setLoading(false);
    }

    const allBooks = books?.map((book, index) => {
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
            books={books}
            bookList={allBooks}
            loading={loading}
            noBooks={noBooks}
            onChange={handleChange}
            onSubmit={handleSubmit} 
            quote={quote}
            searched={searched}
            term={term}
        />
    );
}

export default BooksContainer;

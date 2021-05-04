import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Book from '../Book';
import Books from './Books';

const BooksContainer = ({
    addToCart,
    books,
    searchParams
}) => {
    const bookHasPrice = b => !!(b.saleInfo?.listPrice?.amount);

    let searchResults = books;

    if (searchParams.canBuy) {
        // filter
        searchResults = books.filter(b => bookHasPrice(b));
    }

    // TODO
    // these need more work
    // if (searchParams.genre) {
    //     searchResults = books.filter(b => bookMatchesGenre(b));
    // }


    // if (searchParams.author) {
    //     searchResults = books.filter(b => bookHasPrice(b));
    // }

    const bookList = searchResults?.map((book, index) => {
        return (
            <Book 
                title={book.volumeInfo.title} book={book}
                author={book.volumeInfo.authors && book.volumeInfo.authors[0]} 
                category={book.volumeInfo.categories && book.volumeInfo.categories[0]} 
                description={book.volumeInfo.description}
                price={book.saleInfo?.listPrice?.amount || book.saleInfo?.retailPrice?.amount}
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
            bookList={bookList}
        />
    );
}

export default BooksContainer;

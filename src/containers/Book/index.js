import React from 'react';
import Book from '../../components/Book';

const BookContainer = props => (
    <Book addToCart={props.addToCart} {...props} />
);

export default BookContainer;

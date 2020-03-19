import React from 'react';
import BooksContainer from '../containers/Books';

const Home = ({ firebase }) => (
    <BooksContainer firebase={firebase} />
);

export default Home;

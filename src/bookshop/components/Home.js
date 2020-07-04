import React from 'react';
import Books from '../Books';

const Home = ({ firebase }) => (
    <Books firebase={firebase} />
);

export default Home;

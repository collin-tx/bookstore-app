import React from 'react';
import Books from './Books';

const Home = ({ firebase }) => (
    <div>
        <Books firebase={firebase} />
    </div>
);

export default Home

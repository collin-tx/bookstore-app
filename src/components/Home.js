import React, { Component } from 'react';
import Books from './Books';
import quotes from '../quotes.json';

export class Home extends Component {
    render() {
        let quotesLength = Object.keys(quotes).length;
        return (
            <div>
                <Books firebase={this.props.firebase} />
                <p id="quote">{quotes[Math.ceil(Math.random() * quotesLength)]}</p>
            </div>
        )
    }
}

export default Home

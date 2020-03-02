import React, { Component } from 'react';
import BooksContainer from '../containers/Books';

export class Home extends Component {
    render() {
        return (
            <div>
                <BooksContainer firebase={this.props.firebase} />
            </div>
        )
    }
}

export default Home

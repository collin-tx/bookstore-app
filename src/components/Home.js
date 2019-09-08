import React, { Component } from 'react';
import Books from './Books';

export class Home extends Component {
    render() {
        return (
            <div>
                <Books firebase={this.props.firebase} />
            </div>
        )
    }
}

export default Home

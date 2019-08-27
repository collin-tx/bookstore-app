import React, { Component } from 'react';
import Nav from './Nav';

export class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <Nav />
                    <h1 className="text-center">Bookstore</h1>
                </header>
            </div>
        )
    }
}

export default Header

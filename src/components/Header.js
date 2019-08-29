import React, { Component } from 'react';
import Nav from './Nav';

export class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="app-title">
                        <h1 className="text-center">bookshop</h1>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header

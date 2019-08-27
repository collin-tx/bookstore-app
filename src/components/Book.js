import React, { Component } from 'react'

export class Book extends Component {
    render() {
        return (
            <div>
                <li>
                {this.props.title}
                </li>
            </div>
        )
    }
}

export default Book

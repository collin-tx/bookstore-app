import React, { Component } from 'react'

export class CartBook extends Component {
    render() {
        return (
            <div>
                <li className="list-group-item">
                    <h2>{this.props.title}</h2>
                    <img src={this.props.img} alt="book cover" />
                    <p>{this.props.author}</p>
                </li>
            </div>
        )
    }
}

export default CartBook

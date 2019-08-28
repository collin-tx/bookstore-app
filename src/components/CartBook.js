import React, { Component } from 'react'

export class CartBook extends Component {
    render() {
        return (
            <div>
                <li className="list-group-item">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.subtitle}</p>
                    <img src={this.props.img} alt="book cover" />
                    <p>{this.props.author}</p>
                    <p>{this.props.description}</p>
                    <button className="btn btn-danger" onClick={(e) => this.props.remove(e, this.props.book.key)}>X</button>
                </li>
            </div>
        )
    }
}

export default CartBook

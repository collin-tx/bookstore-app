import React, { Component } from 'react'

export class Book extends Component {
    render() {
        return (
                <li className="book list-group-item">
                    <h2>{this.props.title}</h2>
                    <img src={this.props.img} alt="book cover" />
                    <p>{this.props.author}</p>
                    <p>$5.00</p>
                    <a className="btn btn-info" href={this.props.preview} target="_blank" rel="noopener noreferrer">Preview</a>
                    <button className="btn btn-success" onClick={(e) => this.props.addToCart(e, this.props.index)}>Add to Cart</button>
                </li>
        )
    }
}

export default Book

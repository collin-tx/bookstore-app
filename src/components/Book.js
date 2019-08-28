import React, { Component } from 'react'

export class Book extends Component {
    render() {
        return (
                <li className="book list-group-item">
                    <h2>{this.props.title}</h2>
                    <img src={this.props.img} alt="book cover" />
                    <p>{this.props.author}</p>
                    <button className="btn btn-primary">Preview</button>
                    <button className="btn btn-info">More Info</button>
                    <button className="btn btn-success" onClick={(e) => this.props.addToCart(e, this.props.index)}>Add to Cart</button>
                </li>
        )
    }
}

export default Book

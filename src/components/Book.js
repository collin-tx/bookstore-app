import React, { Component } from 'react'

export class Book extends Component {
    
    render() {
        return (
                <li className="book list-group-item">
                    <h2>{this.props.title}</h2>
                    <img src={this.props.img} alt={this.props.title + "book cover"} className="book-cover" />
                    <p>{this.props.author}</p>
                    {this.props.price ? <p>{"$ " + this.props.price.toFixed(2)}</p> : <p>Not for sale</p>}
                    <div className="book-actions">
                        <a className="btn btn-info mr-1 preview-link" href={this.props.preview} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-book-reader"></i> Preview
                        </a>
                        {this.props.price && 
                        <button className="btn btn-success add-to-cart" onClick={(e) => this.props.addToCart(e, this.props.index)}>
                            <i className="fas fa-shopping-cart"></i> Add to Cart
                        </button>}
                    </div>
                </li>
        )
    }
}

export default Book

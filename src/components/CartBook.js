import React, { Component } from 'react'

export class CartBook extends Component {
    render() {
        return (
            <div>
                <li className="list-group-item cartBook">
                    <div className="col">
                        <h2>{this.props.title}</h2>
                        <p>{this.props.subtitle}</p>
                        <img src={this.props.img} className="cart-book-img" alt="book cover" />
                        <p>{this.props.author}</p>
                        <p>$ {this.props.price}</p>
                    </div>

                    <div className="col">
                        <p>{this.props.description.length > 500 ? this.props.description.slice(0, 500) + "..." : this.props.description}</p>
                        <a className="btn btn-info cart-btn" href={this.props.link} rel="noopener noreferrer" target="_blank"><i className="fas fa-info"></i> more info</a>
                        <a className="btn btn-info cart-btn" href={this.props.preview} target="_blank" rel="noopener noreferrer"><i className="fas fa-book-reader"></i> preview</a>
                        <button className="btn btn-danger cart-btn" onClick={(e) => this.props.remove(e, this.props.book.key)}><i className="fas fa-minus-circle"></i> remove</button>
                    </div>
                </li>
            </div>
        )
    }
}

export default CartBook

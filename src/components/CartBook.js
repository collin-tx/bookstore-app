import React from 'react'

const CartBook = ({
    author,
    book,
    description,
    img,
    link,
    price,
    preview,
    remove = () => {},
    subtitle,
    title
}) => (
    <div>
        <li className="list-group-item cartBook">
            <div className="col">
                <h2>{title}</h2>
                <p>{subtitle}</p>
                <img src={img} className="cart-book-img" alt="book cover" />
                <p>{author}</p>
                <p>$ {price}</p>
            </div>

            <div className="col">
                <p>
                    {!description ? 'No description available' : description.length > 500 ? description.slice(0, 500) + "..." : description}
                </p>
                <a className="btn btn-info cart-btn" href={link} rel="noopener noreferrer" target="_blank">
                    <i className="fas fa-info"></i> 
                    {" more info"}
                </a>
                <a className="btn btn-info cart-btn" href={preview} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-book-reader"></i> 
                    {" preview"}
                </a>
                <button className="btn btn-danger cart-btn" onClick={(e) => remove(e, book.key)}>
                    <i className="fas fa-minus-circle"></i> 
                    {" remove"}
                </button>
            </div>
        </li>
    </div>
);

export default CartBook

import React from 'react';

const Book = ({
  author,
  favorited,
  img,
  index,
  onClickFavorite = () => {},
  preview,
  price,
  title,
  addToCart = () => {}
}) => (
  <li className="book list-group-item">
    <h2>{title}</h2>
    <img src={img} alt={title + "book cover"} className="book-cover" />
    <p>{author}</p>
    {price ? <p>{"$ " + price.toFixed(2)}</p> : <p>Not for sale</p>}
    <div className="book-actions">
      <a className="btn btn-info mr-1 preview-link" href={preview} target="_blank" rel="noopener noreferrer">
        <i className="fas fa-book-reader"></i> Preview
      </a>
      {
        price && 
          <button className="btn btn-success add-to-cart" onClick={(e) => addToCart(e, index)}>
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </button>
      }
      <button className="btn" onClick={onClickFavorite}><i className={favorited ? "fas fa-heart" : "far fa-heart"}></i></button>
    </div>
  </li>
);

export default Book;

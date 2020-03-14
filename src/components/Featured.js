import React from 'react';

const Featured = ({
    allComments = [],
    book = {},
    featuredBook = {},
    featuredIndex,
    handleChange = () => {},
    handleSubmit = () => {},
    value = '',
    signedIn = false,
    user = null
}) => (
    <div>
        {featuredBook[featuredIndex] && 
            <div id="featuredBook">
                <div id="featured-main">
                    <h2 className="pt-5">Featured This Month</h2>
                    <h4 className="m-5">{book.volumeInfo.title}</h4>
                    <img id="featured-cover" src={book.volumeInfo.imageLinks.thumbnail}
                            alt="featured book cover" />
                    <p className="mt-3">{book.volumeInfo.authors[0]}</p>
                    <p>${book.saleInfo.listPrice.amount.toFixed(2)}</p>
                </div>
                <div id="featured-description">
                    <p>{book.volumeInfo.description}</p>
                </div>
            
                <div id="comments">
                    <h3 className="text-center m-5">Comments</h3>

                    <ul className="list-group">
                        {allComments}
                    </ul>

                    <h3 id="comment-invite" className="text-center m-5">Write a Comment</h3>

                    {
                        !signedIn &&
                        <p className="text-center">You may write an anonymous comment or <a href="#top">sign in</a></p>
                    }

                    <form id="comment-form" className="m-5" onSubmit={handleSubmit}>
                        <input type="text" value={value} onChange={handleChange} 
                        id="comment-field" className="form-control" />
                        <button type="submit" className="btn btn-primary" id="comment-submit">
                            <i className="fa fa-paper-plane"></i> 
                            submit
                        </button>
                    </form>

                    <p className="text-center">commenting as {signedIn ? user : 'guest'}</p>
                </div>

            </div>
        }
    </div>
);

export default Featured;

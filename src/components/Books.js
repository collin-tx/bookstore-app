import React from 'react';

const Books = ({
    adding,
    bookList = [],
    books = [],
    error = {},
    loading,
    noBooks = false,
    onSubmit = () => {},
    term,
    onChange = () => {},
    quote,
    searched,
}) => (
    <div className="container-fluid" >
        <form onSubmit={onSubmit} id="search-form">
            <input type='text' value={term} onChange={onChange} 
            placeholder="Search for a book..." className="form-control" id="search-input" />
            <button type='submit' className="btn btn-primary" id="search-submit"><i className="fas fa-search"></i> Search</button>
        </form>

        {
            !searched && !books.length &&
                <div>
                    <h3 className="text-center m-5">Happy Reading!</h3>
                    <p className="text-center mt-5">Your search results will display here.</p>
                </div>
        }

        {
            // display error
            !!error && error.message && (
                <div>
                    <p className="error">{error.message}</p>
                </div>
            )
        }

        {/* TODO: better solution for notifying user a book is being/has been added */}
        { adding && 
            <div id="adding-div" className="text-center">
                <p>Adding book to cart...</p>
            </div>
        }
        {/* TODO: better looking loading bar */}
        { loading &&
            <div id="loading-div" className="text-center">
                <p>Loading...</p>
            </div>
        }
        {/* TODO: better looking nbf indicator */}
        { searched && noBooks && !loading &&
            <div className="text-center">
                <p>No Books Found</p>
            </div>
        }

        <ul className="list-group" id="bookList">
            {bookList}
        </ul>

        <p id="quote">{quote}</p>

        {!bookList ? <div id="spacer-div" /> : ''}

    </div>
);


export default Books;

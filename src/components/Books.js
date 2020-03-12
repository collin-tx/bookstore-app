import React from 'react';

const Books = ({
    adding,
    bookList = [],
    books = [],
    loading,
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

        {!searched &&
            <div>
                <h3 className="text-center m-5">Welcome</h3>
                <h5 className="text-center m-3">Your search results will display here. <br /> Happy Reading!</h5>
            </div>
        }

        { adding && 
            <div id="adding-div" className="text-center">
                <p>Adding book to cart...</p>
            </div>
        }
        
        { loading &&
            <div id="loading-div" className="text-center">
                <p>Loading...</p>
            </div>
        }

        { searched && !books.length && !loading &&
            <div id="error-div" className="text-center">
                <p>No Books found</p>
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

import React from 'react';
import { connect } from 'react-redux';

const Books = (props) => {
    return (
        <div className="container-fluid" >
            <form onSubmit={props.onSubmit} id="search-form">
                <input type='text' value={props.term} onChange={props.onChange} 
                placeholder="Search for a book..." className="form-control" id="search-input" />
                <button type='submit' className="btn btn-primary" id="search-submit"><i className="fas fa-search"></i> Search</button>
            </form>

            {!props.searched &&
                <div>
                    <h3 className="text-center m-5">Welcome</h3>
                    <h5 className="text-center m-3">Your search results will display here. <br /> Happy Reading!</h5>
                </div>
            }

            { props.adding && 
                <div id="adding-div" className="text-center">
                    <p>Adding book to cart...</p>
                </div>
            }
            
            { props.loading &&
                <div id="loading-div" className="text-center">
                    <p>Loading...</p>
                </div>
            }

            { props.searched && props.books[0] && props.books[0].totalItems < 1 &&
                <div id="error-div" className="text-center">
                    <p>No Books found</p>
                </div>
            }

            <ul className="list-group" id="bookList">
                {props.bookList}
            </ul>

            <p id="quote">{props.quote}</p>

            {!props.bookList ? <div id="spacer-div" /> : ''}

        </div>
    )
}

const mapState = state => state;

export default connect(mapState)(Books);

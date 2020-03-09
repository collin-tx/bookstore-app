import React from 'react';

const Featured = ({
    addComment = () => {},
    allComments = [],
    book = {},
    editComment = () => {},
    featuredBook = {},
    featuredIndex,
    handleChange = () => {},
    handleSubmit = () => {},
    value = '',
    signedIn = false,
    store = {},
    user = ''
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
                    
                    
                    {/* sign in stuff */ }

                    {
                        signedIn &&
                        <p>Leave a comment as {user}</p>
                        
                    }

                    {
                        !signedIn &&
                        <p>You may write an anonymous comment or <a href="#">sign in</a></p>
                    }
                    
                    
                    {/* <div id="sign-in-div">
                        {!this.state.signedIn && 

                        {this.state.signInError && <p id="sign-in-error">Sorry! Invalid Email. Please try again.</p>}
                        
                        {this.state.signedIn && 
                            <div>
                                <p className={'text-center'}>Signed in as {this.state.username}</p>
                                <button onClick={this.signUserOut} className="btn btn-sm btn-danger">
                                    sign out
                                </button>
                            </div>
                        }
                        
                        {this.state.showSignIn && !this.state.signedIn &&
                            <form id="sign-in-form" onSubmit={this.handleCredentialsSubmit}>
                                <div>
                                    email: <input type="text" onChange={this.handleEmail} value={this.state.email} />
                                </div>
                                <div className="pl-3">
                                    username: 
                                    <input type="text" onChange={this.handleUsername} value={this.state.username}
                                            maxLength={12} />
                                </div>
                                <button className="btn btn-secondary btn-sm">
                                    Sign In
                                </button>
                            </form>
                        }
                    </div> */}

                    <form id="comment-form" className="m-5" onSubmit={handleSubmit}>
                        <input type="text" value={value} onChange={handleChange} 
                        id="comment-field" className="form-control" />
                        <button type="submit" className="btn btn-primary" id="comment-submit">
                            <i className="fa fa-paper-plane"></i> 
                            submit
                        </button>
                    </form>

                    <button className="btn btn-warning" onClick={() => {console.log('storeFEAT', store); console.log('nowprops', user,signedIn);}}>log the state or whatever</button>
                <p>commenting as {signedIn ? user : 'guest'}</p>
                </div>

            </div>
        }
    </div>
);

export default Featured;

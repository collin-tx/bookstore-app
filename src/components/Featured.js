import React, { Component } from 'react';
import Comment from './Comment';
import { generateKey } from '../utils/helper';

export class Featured extends Component {
    
    state = {
        featuredBook: {},
        value: '',
        showSignIn: false,
        signedIn: false,
        email: '',
        username: '',
        credentials: [],
        signInError: false
    }
    
    componentDidMount(){
          let database = this.props.firebase;
          let featured = database.ref('featured');
          this.setState({ featured, database });

          featured.on('value', response => {
              const featuredData = response.val();
              this.setState({ featuredBook: featuredData });
          })
    }


    // comment methods
    addComment = () => {
        let featuredIndex = Object.keys(this.state.featuredBook);
        this.state.database.ref('featured/' + featuredIndex +'/book/comments').push({
            user: this.state.username,
            key: this.state.value
        });
        this.setState({ value: '' })

    }

    handleChange = (e) => {
        this.setState({ value: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.addComment();
    }

    editComment = (e, key, newComment) => {
        let featuredIndex = Object.keys(this.state.featuredBook);
        this.state.database.ref('featured/' + featuredIndex + '/book/comments/' + key).update({key:newComment});
        this.setState({ value: '', editing: false });
    }


    // sign in methods
    toggleSignIn = () => {
        this.setState({ 
            showSignIn: !this.state.showSignIn
        })
    } 

    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handleUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    handleCredentialsSubmit = (e) => {
        e.preventDefault();
        if(this.state.email.length && this.state.email.length && this.state.email.includes('@', '.')){
        this.setState({ 
            credentials: [this.state.email, this.state.username],
            signedIn: true,
            signInError: false
        })
        } else {
        this.setState({ signInError: true })
        }
    }

    signUserOut = () => {
        this.setState({ 
            signedIn: false,
            username: '',
            email: '',
            showSignIn: false
        })
    }






    
    render() {
        let featuredIndex = Object.keys(this.state.featuredBook);
        let book = this.state.featuredBook[featuredIndex] && this.state.featuredBook[featuredIndex].book;
        
        let allComments = [];
        // eslint-disable-next-line
        for(let keyOfComment in book && book.comments){
            allComments.push(book.comments[keyOfComment]);
        }

        allComments = allComments.map( (comment, index) => {
            return (
                <Comment key={generateKey(index)} comment={comment.key} user={comment.user} edit={this.editComment} 
                commentKey={Object.keys(this.state.featuredBook[featuredIndex].book.comments)[index]}
                username={this.state.username} />
            )
        })
        
        return (
            <div>
                    {this.state.featuredBook[featuredIndex] && 
                        <div id="featuredBook">
                            <div id="featured-main">
                                <h2 className="pt-5">Featured This Month</h2>
                                <h4 className="m-5">{book.volumeInfo.title}</h4>
                                <img id="featured-cover" src={book.volumeInfo.imageLinks.thumbnail} alt="featured book cover" />
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
                                
                                <div id="sign-in-div">
                                   {!this.state.signedIn && <p>{this.state.showSignIn ? "No thanks, " : "You may write an anonymous comment or "}<button id="sign-in-btn" onClick={this.toggleSignIn}>{this.state.showSignIn ? "hide sign in" : "sign in"}</button></p>}
                                    {this.state.signInError && <p id="sign-in-error">Sorry! Invalid Email. Please try again.</p>}
                                    
                                    {this.state.signedIn && 
                                        <div>
                                            <p className={'text-center'}>Signed in as {this.state.username}</p>
                                            <button onClick={this.signUserOut} className="btn btn-sm btn-danger">sign out</button>
                                        </div>
                                    }
                                    
                                    {this.state.showSignIn && !this.state.signedIn &&
                                        <form id="sign-in-form" onSubmit={this.handleCredentialsSubmit}>
                                            <div>
                                                email: <input type="text" onChange={this.handleEmail} value={this.state.email} />
                                            </div>
                                            <div className="pl-3">
                                                username: <input type="text" onChange={this.handleUsername} value={this.state.username} maxLength={12} />
                                            </div>
                                            <button className="btn btn-secondary btn-sm">Sign In</button>
                                        </form>
                                    }
                                </div>

                                <form id="comment-form" className="m-5" onSubmit={this.handleSubmit}>
                                    <input type="text" value={this.state.value} onChange={this.handleChange} 
                                    id="comment-field" className="form-control" />
                                    <button type="submit" className="btn btn-primary" id="comment-submit">
                                        <i className="fa fa-paper-plane"></i> 
                                        submit
                                    </button>
                                </form>

                            </div>

                        </div>
                    }
            </div>
        )
    }
}

export default Featured

import React, { Component } from 'react';
import Comment from './Comment';
import { generateKey } from '../utils/helper';

export class Featured extends Component {
    
    state = {
        featuredBook: {},
        value: '',
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

    addComment = () => {
        let featuredIndex = Object.keys(this.state.featuredBook);
        this.state.database.ref('featured/' + featuredIndex +'/book/comments').push({key: this.state.value});
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
                <Comment key={generateKey(index)} comment={comment.key} edit={this.editComment} commentKey={Object.keys(this.state.featuredBook[featuredIndex].book.comments)[index]} />
            )
        })
        
        return (
            <div>
                    {this.state.featuredBook[featuredIndex] && 
                        <div id="featuredBook">
                            <div id="featured-main">
                                <h2 className="m-5">{book.volumeInfo.title}</h2>
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

                                <form id="comment-form" className="m-5" onSubmit={this.handleSubmit}>
                                    <input type="text" value={this.state.value} onChange={this.handleChange} id="comment-field" className="form-control" />
                                    <button type="submit" className="btn btn-primary" id="comment-submit"><i className="fa fa-paper-plane"></i> submit</button>
                                </form>

                            </div>

                        </div>
                    }
            </div>
        )
    }
}

export default Featured

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Featured from './Featured';
import Comment from './Comment';

import { generateKey } from '../../utils/helper';

import {
    addComment,
    deleteComment,
    getFeaturedBook,
    updateComment
} from '../../entities/featured';

export class FeaturedContainer extends Component {
    
    state = {
        featuredBook: {},
        value: ''
    }
    
    componentDidMount(){
        let { firebase, getFeatured } = this.props;
        let database = firebase.database();
        getFeatured(firebase);
        this.setState({ database });
    }

    addComment = () => {
        addComment(this.props.firebase, this.props.featured, this.state.value);
        this.setState({ value: '' });
    }

    handleChange = e => {
        this.setState({ value: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addComment();
    }

    editComment = (e, key, newComment) => {
        updateComment(this.props.firebase, this.props.featured, key, newComment);
        this.setState({ value: '', editing: false });
    }

    deleteComment = (e, key) => {
        deleteComment(this.props.firebase, this.props.featured, key);
    }

    render() {
        let featuredIndex = Object.keys(this.props.featured);
        let book = this.props.featured[featuredIndex] && this.props.featured[featuredIndex].book;
        
        let allComments = [];
            // eslint-disable-next-line
        for(let keyOfComment in book && book.comments){
            allComments.push(book.comments[keyOfComment]);
        }

        allComments = allComments.map( (comment, index) => {
            return (
                <Comment 
                    key={generateKey(index)}
                    comment={comment.key}
                    username={comment.username}
                    user={this.props.user}
                    userId={comment.userId}
                    edit={this.editComment}
                    delete={this.deleteComment}
                    commentKey={Object.keys(this.props.featured[featuredIndex].book.comments)[index]}
                />
            )
        });
        return (
            <Featured 
                allComments={allComments}
                book={book}
                featuredBook={this.props.featured}
                featuredIndex={featuredIndex}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                isSignedIn={this.props.isSignedIn}
                user={(this.props.user && this.props.user.displayName) || 'guest'}
                value={this.state.value}
            />
        );
    }
}

const mapState = state => {
    return {
        user: state.user,
        isSignedIn: state.isSignedIn,
        featuredBook: state.featured,
        ...state
    }
}

const mapDispatch = dispatch => ({
    getFeatured: (firebase) => dispatch(getFeaturedBook(firebase))
});

export default connect(mapState, mapDispatch)(FeaturedContainer);

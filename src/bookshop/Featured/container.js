import React, { Component } from 'react';
import { connect } from 'react-redux';

import Featured from './Featured';
import Comment from './Comment';

import { generateKey } from '../../utils/helper';

export class FeaturedContainer extends Component {
    
    state = {
        featuredBook: {},
        value: ''
    }
    
    componentDidMount(){
        // connect to db and read from featured table
        let { firebase } = this.props;
        let database = firebase.database();
        let featured = database.ref('featured');
        this.setState({ featured, database });

        featured.on('value', response => {
            const featuredData = response.val();
            this.setState({ featuredBook: featuredData });
        });
    }

    addComment = () => {
        let featuredIndex = Object.keys(this.state.featuredBook);
        this.state.database.ref('featured/' + featuredIndex +'/book/comments')
            .push({
                username: (this.props.user ? this.props.user.displayName : 'Anonymous') ,
                key: this.state.value,
                userId: this.props.user.uid
            });
        this.setState({ value: '' })
    }

    handleChange = e => {
        this.setState({ value: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addComment();
    }

    editComment = (e, key, newComment) => {
        let featuredIndex = Object.keys(this.state.featuredBook);
        this.state.database.ref('featured/' + featuredIndex + '/book/comments/' + key)
            .update({key:newComment});
        this.setState({ value: '', editing: false });
    }

    deleteComment = (e, key) => {
        let featuredIndex = Object.keys(this.state.featuredBook);
        this.state.database.ref('featured/' + featuredIndex + '/book/comments/' + key)
            .remove();
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
                <Comment 
                    key={generateKey(index)}
                    comment={comment.key}
                    username={comment.username}
                    user={this.props.user}
                    userId={comment.userId}
                    edit={this.editComment}
                    delete={this.deleteComment}
                    commentKey={Object.keys(this.state.featuredBook[featuredIndex].book.comments)[index]}
                />
            )
        });
        return (
            <Featured 
                allComments={allComments}
                book={book}
                featuredBook={this.state.featuredBook}
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
        state
    }
}

export default connect(mapState)(FeaturedContainer);

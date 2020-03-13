import React, { Component } from 'react';
import Featured from '../../components/Featured';
import Comment from '../../components/Comment';
import { generateKey } from '../../utils/helper';
import { connect } from 'react-redux';

export class FeaturedContainer extends Component {
    
    state = {
        featuredBook: {},
        value: ''
    }
    
    componentDidMount(){
        // db stuff
        let database = this.props.firebase;
        let featured = database.ref('featured');
        this.setState({ featured, database });

        featured.on('value', response => {
            const featuredData = response.val();
            this.setState({ featuredBook: featuredData });
        });
    }

    addComment = () => {
        let featuredIndex = Object.keys(this.state.featuredBook);
        this.state.database.ref('featured/' + featuredIndex +'/book/comments').push({
            user: (this.props.user || 'Anonymous') ,
            key: this.state.value
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
                <Comment key={generateKey(index)} comment={comment.key} user={comment.user} 
                edit={this.editComment} username={this.props.user} delete={this.deleteComment}
                commentKey={Object.keys(this.state.featuredBook[featuredIndex].book.comments)[index]} />
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
                signedIn={this.props.signedIn}
                user={this.props.user}
                value={this.state.value}
            />
        );
    }
}

const mapState = state => {
    return {
        user: state.user,
        signedIn: state.signedIn,
        state
    }
}

export default connect(mapState)(FeaturedContainer);

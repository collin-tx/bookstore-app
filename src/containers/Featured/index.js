import React, { Component } from 'react';
import Featured from '../../components/Featured';
import Comment from '../../components/Comment';
import { generateKey } from '../../utils/helper';
import { connect } from 'react-redux';

export class FeaturedContainer extends Component {
    
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
        });
    }


    // comment methods
    addComment = () => {
        let featuredIndex = Object.keys(this.state.featuredBook);
        this.state.database.ref('featured/' + featuredIndex +'/book/comments').push({
            user: this.props.user,
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


    // // sign in methods
    // toggleSignIn = () => {
    //     this.setState({ 
    //         showSignIn: !this.state.showSignIn
    //     })
    // } 

    // handleEmail = (e) => {
    //     this.setState({ email: e.target.value })
    // }

    // handleUsername = (e) => {
    //     this.setState({ username: e.target.value })
    // }

    // handleCredentialsSubmit = (e) => {
    //     e.preventDefault();
    //     if(this.state.email.length && this.state.email.length && this.state.email.includes('@', '.')){
    //     this.setState({ 
    //         credentials: [this.state.email, this.state.username],
    //         signedIn: true,
    //         signInError: false
    //     })
    //     } else {
    //     this.setState({ signInError: true })
    //     }
    // }

    // signUserOut = () => {
    //     this.setState({ 
    //         signedIn: false,
    //         username: '',
    //         email: '',
    //         showSignIn: false
    //     })
    // }

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
                edit={this.editComment} username={this.props.user}
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

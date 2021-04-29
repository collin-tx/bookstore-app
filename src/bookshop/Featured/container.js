import React from 'react';
import { useSelector, useStore } from 'react-redux';

import Featured from './Featured';
import Comment from './Comment';

import { generateKey } from '../../utils/helper';

import {
    addComment as addCommentAction,
    deleteComment as deleteCommentAction,
    updateComment as updateCommentAction
} from '../../entities/featured';

import {
    getFeatured
} from '../../actions/selectors';

const FeaturedContainer = ({
    firebase
}) => {
    // set up state
    const [ commentValue, setCommentValue ] = React.useState('');
    const {
        isSignedIn,
        user
    } = useStore().getState();

    const featured = useSelector(state => getFeatured(state));
    const book = featured[Object.keys(featured)].book;

    const addComment = () => {
        addCommentAction(firebase, featured, commentValue);
        setCommentValue('');
    }

    const handleChange = e => setCommentValue(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        addComment();
    }

    const editComment = (e, key, newComment) => {
        updateCommentAction(firebase, featured, key, newComment);
        setCommentValue('');
    }

    const deleteComment = (e, key) => deleteCommentAction(firebase, featured, key);

    // grabs comments from db.featured
    let allComments = [];
        // eslint-disable-next-line
    for (let keyOfComment in book?.comments){
        allComments.push(book.comments[keyOfComment]);
    }

    allComments = allComments.map((comment, index) => {
        return (
            <Comment 
                key={generateKey(index)}
                comment={comment.key}
                username={comment.username}
                user={user}
                userId={comment.userId}
                onEdit={editComment}
                onDelete={deleteComment}
                commentKey={Object.keys(book.comments)[index]}
            />
        );
    });

    return (
        <Featured 
            allComments={allComments}
            book={book}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSignedIn={isSignedIn}
            user={(user && user.displayName) || 'guest'}
            value={commentValue}
        />
    );
}

export default FeaturedContainer;

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Featured from './Featured';
import Comment from './Comment';

import { generateKey } from '../../utils/helper';

import {
    addComment as addCommentAction,
    deleteComment as deleteCommentAction,
    getFeaturedBook as getFeaturedBookAction,
    updateComment as updateCommentAction
} from '../../entities/featured';

import {
    getFeatured
} from '../../actions/selectors';

const FeaturedContainer = ({
    firebase
}) => {

    const featured = useSelector(state => getFeatured(state));
    const [ commentValue, setCommentValue ] = React.useState('');

    console.log('featured', featured);

    const {
        isSignedIn,
        user
    } = useStore().getState();

    const addComment = () => {
        addCommentAction(firebase, featured, commentValue);
        setCommentValue('');
    }

    const handleChange = e => {
        setCommentValue(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        addComment();
    }

    const editComment = (e, key, newComment) => {
        updateCommentAction(firebase, featured, key, newComment);
        setCommentValue('');
        // setEditing(false);
    }

    const deleteComment = (e, key) => {
        deleteCommentAction(firebase, featured, key);
    }

    const featuredIndex = Object.keys(featured);
    const book = featured[featuredIndex].book;

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
                edit={editComment}
                delete={deleteComment}
                commentKey={Object.keys(book.comments)[index]}
            />
        )
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

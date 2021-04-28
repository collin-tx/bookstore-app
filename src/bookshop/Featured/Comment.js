import React, { useState } from 'react';

const Comment = props => {
    
    const [ editing, setEditing ] = useState(false);
    const [ value, setValue ] = useState('');

    const changeHandler = e => {
        setValue(e.target.value);
    }

    const submitHandler = e => {
        e.preventDefault();
        props.edit(e, props.commentKey, value);
        setValue('');
        setEditing(false);
    }

    const clickEdit = () => {
        setEditing(!editing);
    }

    const clickDelete = e => {
        props.delete(e, props.commentKey);
    }

    const renderEditActions = () => {
        return editing ? (
            <form onSubmit={submitHandler} className="edit-comment-form">
                <input type="text" value={value} className="edit-comment-field" 
                    onChange={changeHandler} placeholder="new comment..." />
                <button type="submit" className="btn btn-sm btn-info">
                    submit
                </button>
                <button type="submit" className="btn btn-sm btn-secondary" onClick={clickEdit}>
                    cancel
                </button>
            </form>
        ) : (
            <div className="featured_comment-actions--buttons">
                <button className="btn btn-info btn-sm" onClick={clickEdit}>
                    edit
                </button>

                <button className="btn btn-danger btn-sm" onClick={clickDelete}>
                    delete
                </button>
            </div>
            )
    }
 
    const { comment, user, username, userId } = props;
    return (
        <li className="list-group-item comment">

            <div className="featured_comment-div">
                
                <div className="featured_comment-user-div">
                    <i className="fas fa-user featured_comment-userIcon"></i>
                    <p className="featured_comment-username">{username}</p>
                </div>

                <div className="featured_comment-text-div">
                    <span>{comment}</span>
                </div>

                <div className="featured_comment-actions">
                {
                    // checks if the currently signedIn user's ID matches the ID of the user who left the comment
                    // if it's a match, the user may edit/delete their comment
                    user && (userId === user.uid) && renderEditActions()
                }
                </div>
            </div>

        </li>
    );
}

export default Comment;

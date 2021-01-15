import React, { Component } from 'react';

export class Comment extends Component {
    
    state = { 
        editing: false,
        value: ''
    }

    changeHandler = e => {
        this.setState({ value: e.target.value });
    }
    
    submitHandler = e => {
        e.preventDefault();
        this.props.edit(e, this.props.commentKey, this.state.value);
        this.setState({ value: '', editing: false });
    }

    clickEdit = () => {
        this.setState({ editing: !this.state.editing })
    }

    clickDelete = e => {
        this.props.delete(e, this.props.commentKey);
    }

    renderEditActions = () => {
        return this.state.editing ? (
            <form onSubmit={this.submitHandler} className="edit-comment-form">
                <input type="text" value={this.state.value} className="edit-comment-field" 
                    onChange={this.changeHandler} placeholder="new comment..." />
                <button type="submit" className="btn btn-sm btn-info">
                    submit
                </button>
                <button type="submit" className="btn btn-sm btn-secondary" onClick={this.clickEdit}>
                    cancel
                </button>
            </form>
        ) : (
            <div className="featured_comment-actions--buttons">
                <button className="btn btn-info btn-sm" onClick={this.clickEdit}>
                    edit
                </button>

                <button className="btn btn-danger btn-sm" onClick={this.clickDelete}>
                    delete
                </button>
            </div>
            )
    }
 
    render() {
        const { comment, user, username, userId } = this.props;
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
                        user && (userId === user.uid) && this.renderEditActions()
                    }
                    </div>
                </div>

            </li>
        )
    }
}

export default Comment;

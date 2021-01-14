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

    render() {
        const { comment, user, username, userId } = this.props;
        return (
            <li className="list-group-item comment">

                <div className="user">
                    <div className="user-icon">                    
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="username">
                        <p>{username}</p>
                    </div>
                </div>

                <div className="comment-content">
                    <p>{comment}</p>
                </div>

                <div className="comment-buttons">

                {/* editing form */}
                {
                    this.state.editing && (
                        <form onSubmit={this.submitHandler} className="edit-comment-form">
                            <input type="text" value={this.state.value} className="edit-comment-field" 
                                onChange={this.changeHandler} placeholder="comment..." />
                            <button type="submit" className="btn btn-sm btn-secondary">
                                change
                            </button>
                        </form>
                    )
                }
                {/* user actions */}
                {
                    // checks if the currently signedIn user's ID matches the ID of the user who left the comment
                    // if it's a match, the user may edit/delete their comment
                    user && (userId === user.uid) && (
                        <div>
                            <button className="btn btn-info btn-sm float-right" onClick={this.clickEdit}>
                                {this.state.editing ? "cancel" : 'edit'}
                            </button>

                            <button className="btn btn-danger btn-sm float-right" onClick={this.clickDelete}>
                                delete
                            </button>
                        </div>
                    )
                }
                </div>
            </li>
        )
    }
}

export default Comment;
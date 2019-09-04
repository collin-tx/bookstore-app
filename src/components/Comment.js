import React, { Component } from 'react'

export class Comment extends Component {
    
    state = { 
        editing: false,
        value: ''
    }

    changeHandler = (e) => {
        this.setState({ value: e.target.value });
    }
    
    submitHandler = (e) => {
        e.preventDefault();
        this.props.edit(e, this.props.commentKey, this.state.value);
        this.setState({ value: '', editing: false });
    }

    clickHandler = (e) => {
        this.setState({ editing: !this.state.editing })
    }

    

    render() {

        return (
            <li className="list-group-item comment">

                <div className="user">
                    <i className="fas fa-user"></i>
                    <p>anonymous</p>
                </div>

                <div className="comment-content">
                    <p>{this.props.comment}</p>
                </div>

                <div className="comment-buttons">
                    <button className="btn btn-info" onClick={this.clickHandler}>
                        {this.state.editing ? "cancel" : 'edit'}
                        </button>
                    {this.state.editing && 
                    <form onSubmit={this.submitHandler} className="edit-comment-form">
                        <input type="text" value={this.state.value} className="edit-comment-field" onChange={this.changeHandler} placeholder="comment..." />
                        <input type="submit" className="btn btn-sm btn-secondary" />
                    </form>
                    }
                </div>
            </li>
        )
    }
}

export default Comment

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
                    <div className="user-icon">                    
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="username">
                        <p>{this.props.user || 'anonymous'}</p>
                    </div>
                    
                </div>

                <div className="comment-content">
                    <p>{this.props.comment}</p>
                </div>

                <div className="comment-buttons">
                    
                {this.state.editing && 
                    <form onSubmit={this.submitHandler} className="edit-comment-form">
                        <input type="text" value={this.state.value} className="edit-comment-field" 
                            onChange={this.changeHandler} placeholder="comment..." />
                        <button type="submit" className="btn btn-sm btn-secondary">
                            change
                        </button>
                    </form>}
                    
                    <button className="btn btn-info btn-sm float-right" onClick={this.clickHandler}>
                        {this.state.editing ? "cancel" : 'edit'}
                    </button>
                    
                </div>
            </li>
        )
    }
}

export default Comment

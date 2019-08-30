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
        //this.editComment(this.state.value);
        this.setState({ value: '' })
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
                    <button className="btn btn-info" onClick={() => this.setState({ editing: !this.state.editing })}>
                        {this.state.editing ? "cancel" : 'edit'}
                        </button>
                    {this.state.editing && 
                    <form onSubmit={this.submitHandler}>
                        <input type="text" value={this.state.value} onChange={this.changeHandler} placeholder="comment..." />
                        <input type="submit" />
                    </form>
                    }
                </div>
            </li>
        )
    }
}

export default Comment

import React, { Component } from 'react'

export class Comment extends Component {
    render() {
        return (
            <li>
                {this.props.comment}
            </li>
        )
    }
}

export default Comment

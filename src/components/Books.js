import React, { Component } from 'react'

export class Books extends Component {
    
    state = {
        term: '',
        books: [],
        loading: false,
        error: ''
    }
    
    componentDidMount(){
        //this.getBook('kill a mockingbird')

    }

    handleChange = (e) => {
        this.setState({ term: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getBook(this.state.term);
        this.setState({ term: '' })
    }

    getBook = (info) => {
        const key = `AIzaSyDgHS5U2g0Hu7uriioyuNYDq0b9j92M8nU`;
        let url = `https://www.googleapis.com/books/v1/volumes?q=${info}&key=${key}`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.term} onChange={this.handleChange} placeholder="Search for a book..." />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default Books

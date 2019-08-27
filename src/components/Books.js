import React, { Component } from 'react'
import Book from './Book';
import key from './key';

export class Books extends Component {
    
    state = {
        term: '',
        books: [],
        loading: false,
        error: ''
    }
    
    componentDidMount(){
        this.getBook('Kurt Vonnegut')

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
        const apiKey = key;
        let url = `https://www.googleapis.com/books/v1/volumes?q=${info}&key=${apiKey}`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState({ books: [data] })
        })
    }

    render() {
        let bookList = this.state.books.length > 0 && this.state.books[0].items.map(book => {
            return (
            <Book title={book.volumeInfo.title} 
            author={book.volumeInfo.authors && book.volumeInfo.authors[0]} 
            category={book.volumeInfo.categories && book.volumeInfo.categories[0]} 
            description={book.volumeInfo.description}
            date={book.volumeInfo.publishedDate} 
            img={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
            infoLink={book.volumeInfo.infoLink} 
            preview={book.volumeInfo.previewLink} 
            id={book.id} 
            key={book.etag} 
            pageCount={book.volumeInfo.pageCount} 
            subtitle={book.volumeInfo.subtitle && book.volumeInfo.subtitle} />
            )
        });

        return (
            <div>
                <form onSubmit={this.handleSubmit} id="form">
                    <input type='text' value={this.state.term} onChange={this.handleChange} 
                    placeholder="Search for a book..." className="form-control" />
                    <input type='submit' className="btn btn-primary" id="submit" />
                </form>
                <ul className="list-group" id="bookList">
                    {bookList}
                </ul>

            </div>
        )
    }
}

export default Books

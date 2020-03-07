import React, { Component } from 'react'
import BookContainer from '../Book';
import Books from '../../components/Books';
import quotes from '../../quotes.json';
import { handleErrors } from '../../utils/helper';
import { fetchBooks } from '../../actions';
import { connect } from 'react-redux';

let quotesLength = Object.keys(quotes).length;
const quote = quotes[Math.ceil(Math.random() * quotesLength)];

export class BooksContainer extends Component {
    
    state = {
        term: '',
        books: [],
        loading: false,
        error: '',
        cart: [],
        adding: false,
        searched: false
    }
    
    componentDidMount(){
          let database = this.props.firebase;
          let cart = database.ref('cart');
          this.setState({ cart });
    }

    handleChange = (e) => {
        this.setState({ term: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getBook(this.state.term);
        this.setState({ term: '' })
    }

    addToCart = (e, index) => {
        this.setState({ adding: true })
        const bookToAdd = this.state.books[0].items[index];
        this.state.cart.push({
            book : bookToAdd,
        });
        setTimeout( ()=> {
            this.setState({ adding: false });
        }, 1000);
    }

    getBook = (info) => {
        this.setState( () => {
            return { loading: true,  searched: true }
        });
        let url = `https://www.googleapis.com/books/v1/volumes?q=${info}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`;
        fetch(url).then(handleErrors)
        .then(response => {
            return response.json();
        }).then(data => {
            this.setState({ books: [data], error: false });
        })
        .catch(error => {
            this.setState({ error, loading: false })
        });


        setTimeout( () => {
            this.setState({ loading: false });
        }, 500);
    }

    render() {
      let bookList = this.state.books[0] && this.state.books[0].items 
      && this.state.books[0].items.map((book, index) => {
      return (
      <BookContainer title={book.volumeInfo.title} 
      author={book.volumeInfo.authors && book.volumeInfo.authors[0]} 
      category={book.volumeInfo.categories && book.volumeInfo.categories[0]} 
      description={book.volumeInfo.description}
      price={book.saleInfo.listPrice && book.saleInfo.listPrice.amount} 
      img={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
      infoLink={book.volumeInfo.infoLink} 
      preview={book.volumeInfo.previewLink} 
      id={book.id} index={index}
      key={book.etag} 
      pageCount={book.volumeInfo.pageCount} 
      subtitle={book.volumeInfo.subtitle && book.volumeInfo.subtitle}
      addToCart={this.addToCart} />
      )
  });
        return (
          <Books
          adding={this.state.adding}
          getBook={this.getBook}
          addToCart={this.addToCart}
          quote={quote}
          bookList={bookList}
          onSubmit={this.handleSubmit} 
          term={this.state.term}
          onChange={this.handleChange}
          searched={this.state.searched}
          books={this.state.books}
          loading={this.state.loading}
          />
        );
    }
}

// const mapState = state => ({ books: state.books });

// export default connect(mapState, { addBookToCart })(BooksContainer);

export default connect(null, { fetchBooks })(BooksContainer);
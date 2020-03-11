import React, { Component } from 'react';
import Book from '../../components/Book';

class BookContainer extends Component {

  // addToCart = (e, index) => {
  //   this.setState({ adding: true })
  //   const bookToAdd = this.state.books[0].items[index];
  //   this.state.cart.push({
  //       book : bookToAdd,
  //   });
  //   setTimeout( () => {
  //       this.setState({ adding: false });
  //   }, 1000);
  // }

  render() {
    // console.log('bookcontainerprops', this.props);
    return (
      <Book addToCart={this.props.addToCart} {...this.props} />
    );
  }

}

export default BookContainer;

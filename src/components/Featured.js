import React, { Component } from 'react';
import firebase from 'firebase';
import Comment from './Comment';

export class Featured extends Component {
    
    state = {
        featuredBook: {},
        value: ''
    }
    
    componentDidMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyBo9Ly_nArNncTpVgPpBFZsP5Wg6VkT0rI",
            authDomain: "books-app-249318.firebaseapp.com",
            databaseURL: "https://books-app-249318.firebaseio.com",
            projectId: "books-app-249318",
            storageBucket: "",
            messagingSenderId: "776537219409",
            appId: "1:776537219409:web:4dd05baa355d57c2"
          };


          // added conditional, otherwise it results in error -- Firebase App named '[DEFAULT]' already exists (app/duplicate-app)
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

          let database = firebase.database();
          let featured = database.ref('featured');
          this.setState({ featured });

          featured.on('value', response => {
              const featuredData = response.val();
              this.setState({ featuredBook: featuredData });
          })
    }


    
    render() {
        let featuredIndex = Object.keys(this.state.featuredBook);
        let book = this.state.featuredBook[featuredIndex] && this.state.featuredBook[featuredIndex].book;

       // console.log(book && typeof book.comments)

        const allComments = [];

        // eslint-disable-next-line
        for (let comment in book && book.comments){
            allComments.push(book.comments[comment]);
        }
        const renderComments = allComments.map((comment, index) => {
            return (
                <Comment key={index} comment={comment} />
            )
        })
        
        return (
            <div>
                    {this.state.featuredBook[featuredIndex] && 
                        <div id="featuredBook">
                            <div>
                                <h2>{book.volumeInfo.title}</h2>
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt="featured book cover" />
                                <p>{book.volumeInfo.authors[0]}</p>
                                <p>${book.saleInfo.listPrice.amount}</p>
                            </div>
                            <div>
                                <p>{book.volumeInfo.description}</p>
                            </div>
                        
                            <div id="comments">
                                <h3>Comments</h3>
                                <ul>
                                 {renderComments}
                                </ul>
                            </div>
                        </div>
                    }
            </div>
        )
    }
}

export default Featured

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/Home';
import CartContainer from '../containers/Cart';
import Nav from '../components/Nav';
import FeaturedContainer from '../containers/Featured';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { connect } from 'react-redux';
import { getHistory } from '../actions';

const Bookshop = ({ getHistory, firebase }) => {
  // on render, check for FB user + get purchase history
  // Authwrapp will create or + sign them in 
  // Unwraps to Bookshop -> welcome modal etc. -> bookshop
  getHistory(firebase);
  
  return (
    <BrowserRouter>
      <Nav firebase={firebase} />
      <Header />
      <Switch>
        <Route path="/" render={ () => <Home firebase={firebase} />} exact />
        <Route path="/cart" render={ () => <CartContainer firebase={firebase} />} />
        <Route path="/featured" render={ ()=> <FeaturedContainer database={firebase.database()} />} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

const mapState = state => ({
  // this component (ie. the app) can now be ignorant of sign in stuff
  //  because the auth wrapper will bounce them out of the club if they dont have id
  // isSignedIn: state.signedIn
});

const mapDispatch = dispatch => ({
  // signInUI: firebase => (signInUI(firebase)(dispatch)),
  getHistory: firebase => (getHistory(firebase)(dispatch))
});

export default connect(mapState, mapDispatch)(Bookshop);

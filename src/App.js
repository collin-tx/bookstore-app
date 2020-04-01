import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CartContainer from './containers/Cart';
import Nav from './components/Nav';
import FeaturedContainer from './containers/Featured';
import Footer from './components/Footer';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import './App.css';
import { connect } from 'react-redux';
import { getHistory, signInUI } from './actions';


var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "books-app-249318.firebaseapp.com",
  databaseURL: "https://books-app-249318.firebaseio.com",
  projectId: "books-app-249318",
  storageBucket: "",
  messagingSenderId: "776537219409",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

const App = props => {
  
  const { signInUI, getHistory } = props;
  signInUI(firebase);
  getHistory(firebase);

  return (
    <BrowserRouter>
      <Nav firebase={firebase} />
      <Header />
      <Switch>
        <Route path="/" render={ () => <Home firebase={firebase} />} exact />
        <Route path="/cart" render={ () => <CartContainer firebase={firebase} />} />
        <Route path="/featured" render={ ()=> <FeaturedContainer database={database} />} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

const mapDispatch = dispatch => ({
  signInUI: firebase => (signInUI(firebase)(dispatch)),
  getHistory: firebase => (getHistory(firebase)(dispatch))
})

export default connect(null, mapDispatch)(App);

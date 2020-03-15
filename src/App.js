import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CartContainer from './containers/Cart';
import Nav from './components/Nav';
import FeaturedContainer from './containers/Featured';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import './App.css';


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


const App = () => (
  <BrowserRouter>
    <Nav firebase={firebase} />
    <Header />
    <Switch>
      <Route path="/" render={ () => <Home />} exact />
      <Route path="/cart" render={ () => <CartContainer />} />
      <Route path="/featured" render={ ()=> <FeaturedContainer database={database} />} />
      <Route component={Error} />
    </Switch>
    <Footer />
  </BrowserRouter>
);


export default App;

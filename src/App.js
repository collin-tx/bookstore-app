import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Nav from './components/Nav';
import Featured from './components/Featured';
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import './App.css';



// Adding Firebase to App
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
const database = firebase.database();


function App() {
  return (
    <BrowserRouter>
    <Nav />
    <Header /> 
    <Switch>
      <Route path="/" render={ () => <Home firebase={database} />} exact />
      <Route path="/cart" render={ () => <Cart firebase={database} />} />
      <Route path="/featured" render={ ()=> <Featured firebase={database} />} />
      <Route component={Error} />
    </Switch>
    <Footer />
</BrowserRouter>
  );
}

export default App;

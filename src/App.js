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

// The original way this app was conceived and functions is essentially using firebase 
// as not only a backend but as a global state of sorts. For obvious reasons this is not ideal
// and needs to be changed. THUS, the app became reduxed (Reduxify - branch) for management of global state
// which means that sign in, commenting, getting/displaying books is all managed by Redux now -- eventually
// the goal is to make Firebase manage ONLY user specific stuff. So hopefully it will track a user's 
// faux purchases, persist the items in their cart, etc. The first version of Reduxed bookshop seems to basically 
//reduce the role components' local state was forced to play and allow signing in/out to be tracked globally

// Adding Firebase to App
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "books-app-249318.firebaseapp.com",
  databaseURL: "https://books-app-249318.firebaseio.com",
  projectId: "books-app-249318",
  storageBucket: "",
  messagingSenderId: "776537219409",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
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

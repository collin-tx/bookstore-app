import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Nav from './components/Nav';
import FeaturedContainer from './containers/Featured';
import Footer from './components/Footer';
import SignInContainer from './containers/sign-in';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import './App.css';



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


const App = ({store}) => {

  return (
    <BrowserRouter>
      <Nav />
      <Header />
      <SignInContainer store={store} firebase={database} />
      <Switch>
        <Route path="/" render={ () => <Home firebase={database} />} exact />
        <Route path="/cart" render={ () => <Cart firebase={database} />} />
        <Route path="/featured" render={ ()=> <FeaturedContainer firebase={database} />} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

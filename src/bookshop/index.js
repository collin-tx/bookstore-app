import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';

import Cart from './Cart';
import Featured from './Featured';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';


const Bookshop = ({ firebase }) => {

  return (
    <BrowserRouter>
      <Nav firebase={firebase} />
      <Header />
      <Switch>
        <Route path="/" render={ () => <Home firebase={firebase} />} exact />
        <Route path="/cart" render={ () => <Cart firebase={firebase} />} />
        <Route path="/featured" render={ ()=> <Featured firebase={firebase} />} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}


export default Bookshop;

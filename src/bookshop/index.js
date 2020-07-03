import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../components/Home';
import Nav from '../components/Nav';

import Cart from './Cart';
import Featured from './Featured';

import { storeHistory } from '../actions';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';


const Bookshop = ({ firebase }) => {

  const dispatch = useDispatch();
  dispatch(storeHistory());
  
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

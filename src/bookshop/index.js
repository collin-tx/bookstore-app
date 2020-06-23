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
import { storeHistory } from '../actions';
import { useDispatch } from 'react-redux';


const Bookshop = ({ firebase }) => {

  const dispatch = useDispatch();
  dispatch(storeHistory());
  
  return (
    <BrowserRouter>
      <Nav firebase={firebase} />
      <Header />
      <Switch>
        <Route path="/" render={ () => <Home firebase={firebase} />} exact />
        <Route path="/cart" render={ () => <CartContainer firebase={firebase} />} />
        <Route path="/featured" render={ ()=> <FeaturedContainer firebase={firebase} />} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}


export default Bookshop;

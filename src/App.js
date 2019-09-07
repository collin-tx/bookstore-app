import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Nav from './components/Nav';
import Featured from './components/Featured';
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Nav />
    <Header /> 
    <Switch>
      <Route path="/" render={ () => <Home firebase="nothing yet" />} exact />
      <Route path="/cart" render={ () => <Cart firebase="nothing yet" />} />
      <Route path="/featured" render={ ()=> <Featured firebase='nothing yet' />} />
      <Route component={Error} />
    </Switch>
    <Footer />
</BrowserRouter>
  );
}

export default App;

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
      <Route path="/" component={Home} exact />
      <Route path="/cart" component={Cart} />
      <Route path="/featured" component={Featured} />
      <Route component={Error} />
    </Switch>
    <Footer />
</BrowserRouter>
  );
}

export default App;

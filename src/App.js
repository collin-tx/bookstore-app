import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Nav from './components/Nav';
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
      <Route component={Error} />
    </Switch>
</BrowserRouter>
  );
}

export default App;

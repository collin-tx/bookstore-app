import React from 'react';
import Auth from './authwrapper/App';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Auth />
  </Provider>
);

export default App;
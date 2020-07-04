import React from 'react';
import { useDispatch } from 'react-redux';

import Authwrapp from './authwrapp/App';

import { initialize } from './actions';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const firebase = dispatch(initialize());
  return <Authwrapp firebase={firebase} />;
}

export default App;
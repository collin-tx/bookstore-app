import React from 'react';
import Authwrapp from './authwrapp/App';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { connect } from 'react-redux';
import { initialize } from './actions';

const App = ({
  initialize
}) => {

  const firebase = initialize();
  return <Authwrapp firebase={firebase} />;
}

const mapDispatch = dispatch => ({
  initialize: () => dispatch(initialize()),
});

export default connect(null, mapDispatch)(App);
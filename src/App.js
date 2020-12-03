import React from 'react';
import Auth from './authwrapper/App';
import { initialize } from './db-bookshop';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = () => <Auth firebase={initialize()(store.dispatch)} />;

export default App;
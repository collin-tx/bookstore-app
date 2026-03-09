import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { initializeApp } from 'firebase';


jest.mock('firebase', () => ({
  initializeApp: () => jest.fn(),
  apps: {
    length: 0
  },
  auth: () => ({
    signOut: () => jest.fn(),
    currentUser: null
  }),
}));  

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

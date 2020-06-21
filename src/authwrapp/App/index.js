import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import Nav from '../../components/Nav.js';
import AuthWrapp from '../Component/container';
import { signInUI } from '../../actions/index.js';
import Bookshop from '../../bookshop';

const mapState = state => ({
  isSignedIn: state.signedIn
});

const mapDispatch = dispatch => ({
  signInUI: fb => dispatch(signInUI(fb))

});


const App = props => {

  const { isSignedIn, firebase } = props;
  const user = firebase.auth().currentUser;
  
  
  const Auth = ({firebase}) => (
    <BrowserRouter>
      <Nav firebase={firebase} />
      <Header />
      <AuthWrapp
        firebase={firebase}
        />
      <Footer />
  </BrowserRouter>
  );
  
  let view = <Auth firebase={firebase} auth="hi" />;

  // THIS CAN DEF BE IMPROVED
  // TODO: 
  if (!isSignedIn) {
    setInterval(() => {
      if (firebase.auth().currentUser) {
        props.signInUI(firebase);
        view = <Bookshop firebase={firebase} />;
      }
    }, 100);
  }

  if (isSignedIn || !!user) {
    props.signInUI(firebase);
    view = <Bookshop firebase={firebase} />;
  }

  return view;
}

export default connect(mapState, mapDispatch)(App);
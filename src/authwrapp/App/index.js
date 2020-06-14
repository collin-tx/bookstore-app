import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'

import AuthWrapp from '../Component/container';
import { signInUI, unwrap } from '../../actions/index.js';


const mapState = state => ({
  isSignedIn: state.signedIn
});

const mapDispatch = dispatch => ({
  unwrap: () => dispatch(unwrap()),
  signInUI: fb => dispatch(signInUI(fb))

});

const App = props => {

  const { isSignedIn, firebase, unwrap } = props;
  // const [ isNewUser, setIsNewUser ] = React.useState(true);

  if (isSignedIn) {
    signInUI(firebase);
    unwrap();
  }

  return (
    <div>
      <Header />
      <AuthWrapp
        firebase={firebase}
        unwrap={unwrap}
        />
      <Footer />
    </div>
  )
}

export default connect(mapState, mapDispatch)(App);
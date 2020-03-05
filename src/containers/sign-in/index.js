import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import SignedIn from '../../components/SignedIn';

class SignInContainer extends Component {
  // need onChange, submit handlers etc.

  state = {
    signedIn: false,
    user: null
  }

  componentDidMount(){
    const currentState = this.props.store.getState();
    console.log(currentState);
    const { signedIn, user  } = currentState;
    this.setState({ signedIn, user })
  }

  renderSignIn = () => {
    console.log('hi');
  }

  render() {
    const { user, signedIn } = this.state;
    return (
        !!this.state.isSignedIn ?
          <SignIn user={user} signedIn={signedIn} /> :
          <SignedIn user={user} isSignedIn={signedIn} />
    );
  }
}

export default SignInContainer;
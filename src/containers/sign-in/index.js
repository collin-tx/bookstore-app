import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import SignedIn from '../../components/SignedIn';

import { connect } from 'react-redux';

import { signIn, signOut } from '../../actions';

class SignInContainer extends Component {
  // need onChange, submit handlers etc.

  state = {
    signedIn: false,
    user: null,
    fieldValue: '',
    email: '',
    password: ''
  }

  componentDidMount(){
    // const currentState = this.props.store.getState();
    // console.log(currentState);
    // const { signedIn, user  } = currentState;
    // this.setState({ signedIn, user });
  }

  handleEmail = e => {
    this.setState({ email: e.target.value });
  }

  handlePassword = e => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.loginUser(this.state.email);
    this.setState({ email: '', password: '' });
  }

  loginUser = () => {
    signIn(this.state.user);
  }

  logoutUser = () => {
    this.setState({ signedIn: false, user: null });
    signOut();
  }

  render() {
    const { email, fieldValue, password, signedIn, user } = this.state;
    console.log('signedin', this.state.signedIn)
    return (
        this.state.signedIn && this.state.user.length ?
          <SignedIn
            user={user}
            isSignedIn={signedIn}
            logout={this.logoutUser}
          /> :
          <SignIn
            user={user}
            signedIn={signedIn}
            email={email}
            fieldValue={fieldValue}
            handleEmail={this.handleEmail}
            handlePassword={this.handlePassword}
            handleSubmit={this.handleSubmit}
            password={password}
          />
    );
  }
}

export default connect(null, { signIn, signOut })(SignInContainer);
import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import SignedIn from '../../components/SignedIn';

import { connect } from 'react-redux';

import { signIn, signOut } from '../../actions';

class SignInContainer extends Component {
  // need onChange, submit handlers etc.

  state = {
    signedIn: false,
    user: '',
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
    // debugger;
    e.preventDefault();
    this.setState({ user: this.state.email, email: '', password: '' });
    setTimeout(() => {
      this.loginUser(this.state.user);
    }, 10); // janky but bc of this, it now passes along the right action.payload shit
  }

  loginUser = user => {
    //TODO - USER AUTH STUFF
    // console.log(this.props.firebase.auth());
    this.setState({ signedIn: true, });
    console.log('signin action', signIn(this.state.user)); // action.payload = null! wtf
    signIn(user);
    console.log('store from signin', this.props.store, 'state', this.props.store.getState());
    console.log('signin props', this.props)// map state is putting props on the component BUT they are undefined hmm?
  }

  logoutUser = () => {
    this.setState({ signedIn: false, user: null });
    signOut();
  }

  render() {
    const { email, fieldValue, password, signedIn, user } = this.state;
    console.log('signedin', this.state.signedIn);
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

const mapState = state => (
  {
    user: state.user,
    signedIn: state.signedIn
  }
);

export default connect(mapState, { signIn, signOut })(SignInContainer);
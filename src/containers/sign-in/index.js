import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { connect } from 'react-redux';
import { signIn, signOut, createUser } from '../../actions';
import { validateEmail, validatePassword } from '../../utils/helper';

class SignInContainer extends Component {

  state = {
    email: '',
    error: '',
    password: '',
    passwordVerify: '',
    signedIn: false,
    user: {},
    username: ''
  }


  handleEmail = e => {
    this.setState({ email: e.target.value });
  }

  handlePassword = e => {
    this.setState({ password: e.target.value });
  }

  handlePasswordVerify = e => {
    this.setState({ passwordVerify: e.target.value });
  }

  handleUsername = e => {
    this.setState({ username: e.target.value })
  }

  handleSubmit = (e, email, password, passwordVerify) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password, passwordVerify)) {
      if (this.props.isNewUser) {
        this.createNewUser(this.state.email, this.state.password, this.state.username);
      } else {
        this.loginUser(this.state.email, this.state.password);
      }
      this.setState({ user: this.props.firebase.auth().currentUser, signedIn: true });
    } else if (!validateEmail(email)) {
      this.setState({ error: 'Please use a proper email address' });
    } else if (!validatePassword(password, passwordVerify)) {
      this.setState({ error: 'passwords must match' });
    }
  }

  loginUser = (email, password) => {
    const { firebase } = this.props;
    this.props.signIn(firebase, email, password);
    const signedInUser = firebase.auth().currentUser;
    this.setState({ signedIn: true, user: signedInUser })
  }

  createNewUser = (email, password, username) => {
    const { firebase } = this.props;
    this.props.createUser(firebase, email, password, username);
    const signedInUser = firebase.auth().currentUser;
    this.setState({ signedIn: true, user: signedInUser });
  }

  render() {
    const { email, error, password, passwordVerify, signedIn, user, username } = this.state;
    const { isNewUser } = this.props;

    const form = isNewUser ? (
      <SignUp 
        email={email}
        error={error}
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handlePasswordVerify={this.handlePasswordVerify}
        handleSubmit={this.handleSubmit}
        handleUsername={this.handleUsername}
        password={password}
        passwordVerify={passwordVerify}
        username={username}
      /> ) : (
         <SignIn
        user={user}
        signedIn={signedIn}
        email={email}
        error={error}
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleSubmit={this.handleSubmit}
        password={password}
      /> );

    return form;
  }
}

const mapState = state => (
  {
    user: state.user,
    signedIn: state.signedIn,
    state
  }
);

const mapDispatch = dispatch => (
  {
    signIn: (firebase, email, password) => dispatch(signIn(firebase, email, password)),
    signOut: firebase => dispatch(signOut(firebase)),
    createUser: (firebase, email, password, username) => dispatch(createUser(firebase, email, password, username))
  }
);

export default connect(mapState, mapDispatch)(SignInContainer);

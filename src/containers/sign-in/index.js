import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

class SignInContainer extends Component {

  state = {
    email: '',
    error: '',
    password: '',
    signedIn: false,
    user: '',
    username: ''
  }

  handleEmail = e => {
    this.setState({ email: e.target.value });
  }

  handlePassword = e => {
    this.setState({ password: e.target.value });
  }

  handleUsername = e => {
    this.setState({ username: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.email.length > 5 && this.state.password.length >= 5) {
      setTimeout(() => {
        this.loginUser(this.state.email, this.state.email, this.state.password);
        this.setState({ user: this.state.email, email: '', password: '' });
        this.props.closeModal();
      }, 100); // janky but bc of this, it now passes along the right action.payload
    } else {
      this.setState({ 
        error: 'email and password needs to be at least 5 letters'
      });
    }
  }

  loginUser = (user, email, password) => {
    //TODO - USER AUTH STUFF
    this.setState({ signedIn: true, error: ''});
    this.props.signIn(user);
    this.props.firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('while signing in - ' + errorCode + ' - ' + errorMessage);
    });
    console.log('current FB USER!', this.props.firebase.auth().currentUser);
  }

  logoutUser = () => {
    this.setState({ signedIn: false, user: null });
    this.props.signOut();
    this.props.firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  createNewUser = (username, email, password) => {
    this.setState({ signedIn: true, error: '' });
    this.props.signIn(username);
    this.props.firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log('while signing up - ' + errorCode + ' - ' + errorMessage);
    });
    const user = this.props.firebase.auth().currentUser;

    user.updateProfile({
      displayName: username,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
    console.log('current FB USER!', user);
  }

  render() {
    const { email, error, password, signedIn, user, username } = this.state;
    const { isNewUser } = this.props;

    const form = isNewUser ? (
      <SignUp 
        email={email}
        error={error}
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleSubmit={this.handleSubmit}
        handleUsername={this.handleUsername}
        password={password}
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
    signIn: user => dispatch(signIn(user)),
    signOut: () => dispatch(signOut())
  }
);

export default connect(mapState, mapDispatch)(SignInContainer);

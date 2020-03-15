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
    user: {},
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

        if (this.props.isNewUser) {
          this.createNewUser(this.state.username, this.state.email, this.state.password);
        } else {
          this.loginUser(this.state.username, this.state.email, this.state.password);
        }
        this.setState({ email: '', password: '' });
        this.props.closeModal();
      }, 100); // janky but bc of this, it now passes along the right action.payload
    } else {
      this.setState({ 
        error: 'email and password needs to be at least 5 letters'
      });
    }
  }

  loginUser = (username, email, password) => {
    const { firebase } = this.props;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const signedInUser = firebase.auth().currentUser;
      this.props.signIn(signedInUser.displayName || email);
      this.setState({ signedIn: true, error: '', user: signedInUser });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('while signing in - ' + errorCode + ' - ' + errorMessage);
    });
    console.log('current FB USER!', this.state.user);
  }

  logoutUser = () => {
    this.setState({ signedIn: false, user: null });
    this.props.firebase.auth().signOut().then(() => {
      // needs to open a prompt or modal for confirmation?
      this.props.signOut();
    }).catch((error) => {
      console.log('sign out error', error);
    });
  }

  createNewUser = (username, email, password) => {
    const { firebase } = this.props;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const signedInUser = firebase.auth().currentUser;
      this.props.signIn(username);
      this.setState({ signedIn: true, error: '', user: signedInUser });
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: username,
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        console.log('user name is now ' + user.displayName)
      }).catch(function(error) {
        console.log('naming error', error)
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log('while signing up - ' + errorCode + ' - ' + errorMessage);
    });
    
    console.log('current FB USER!', this.state.user);
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

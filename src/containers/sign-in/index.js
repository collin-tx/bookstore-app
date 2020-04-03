import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import SignedIn from '../../components/SignedIn';
import { connect } from 'react-redux';
import { signIn, signOut, createUser, removeError, renderError } from '../../actions';
import { validateEmail, validatePassword } from '../../utils/helper';

class SignInContainer extends Component {

  state = {
    email: '',
    password: '',
    passwordVerify: '',
    signedIn: false,
    user: {},
    username: ''
  }

  componentDidMount(){
    const user = this.props.firebase.auth().currentUser;
    if (!!user){
      this.setState({ signedIn: true, user });
    } else {
      this.setState({ signedIn: false, user: {} })
    }
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

  handleSubmit = (e, email, password, passwordVerify, newUser = false) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password, passwordVerify)) {
      if (this.props.isNewUser) {
        if (!!this.state.username.length){
        this.createNewUser(this.state.email, this.state.password, this.state.username);
        }
      } else {
        this.loginUser(this.state.email, this.state.password);
      }
    }
    
    if (!validateEmail(email)) {
      this.props.renderError({ error: { message: 'Please use a proper email address' } });
    } else if (!validatePassword(password, passwordVerify)) {
      this.props.renderError({ error: { message: newUser ? 'Passwords must match and be at least 6 characters' : 'Incorrect Password' } });
    } else if (!this.state.username.length && newUser){
      this.props.renderError({ error: { message: 'Please enter a username' } });
    }

    const user = this.props.firebase.auth().currentUser
    if (!!user) {
      this.setState({ user, signedIn: true });
    } 
  }

  loginUser = (email, password) => {
    const { firebase } = this.props;
    this.props.signIn(firebase, email, password);
    const signedInUser = firebase.auth().currentUser;
    this.setState({ signedIn: true, user: signedInUser });
  }

  createNewUser = (email, password, username) => {
    const { firebase } = this.props;
    this.props.createUser(firebase, email, password, username);
    const signedInUser = firebase.auth().currentUser;
    this.setState({ signedIn: true, user: signedInUser });
  }

  render() {
    const { email, password, passwordVerify, signedIn, user, username } = this.state;
    const { isNewUser, firebase, error } = this.props;
    const currentUser = firebase.auth().currentUser;
    const onSignOut = () => {
      firebase.auth().signOut()
      .then(() => {
        this.props.signOut(firebase);
      });
    }

    let form = isNewUser ? (
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

    if (!!signedIn && !!currentUser) {
      form = <SignedIn logout={onSignOut} />
    }

    return form;
  }
}

const mapState = state => ({
    user: state.user,
    signedIn: state.signedIn,
    error: state.error,
    state
});

const mapDispatch = dispatch => ({
    signIn: (firebase, email, password) => dispatch(signIn(firebase, email, password)),
    signOut: firebase => dispatch(signOut(firebase)),
    createUser: (firebase, email, password, username) => dispatch(createUser(firebase, email, password, username)),
    removeError: () => dispatch(removeError()),
    renderError: error => dispatch(renderError(error))
});

export default connect(mapState, mapDispatch)(SignInContainer);

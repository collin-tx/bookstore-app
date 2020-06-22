import React, { Component } from 'react';
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp';
import { connect } from 'react-redux';
import { signIn, isSignedIn, signOut, createUser, removeError, renderError} from '../../actions';
import { validateEmail, validatePassword } from '../../utils/helper';


class SignInContainer extends Component {

  state = {
    email: '',
    password: '',
    passwordVerify: '',
    username: ''
  }

  componentDidMount(){
    const user = this.props.firebase.auth().currentUser;
    if (!!user){
      if (!this.state.signedIn) {
        this.props.isSignedIn(this.props.firebase);
      }
      
    } else {
      this.props.signOut(this.props.firebase);
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

          this.props.createUser(this.props.firebase, this.state.email, this.state.password, this.state.username);
          this.props.isSignedIn(this.props.firebase);
        }
      }
      
      if (!this.props.isNewUser) {
        this.loginUser(this.state.email, this.state.password);
        const user = this.props.firebase.auth().currentUser
        if (!!user) {
          this.props.isSignedIn(this.props.firebase);
        } 
      }
    }
    
    // errors
    // todo: clean THIS UP oof
    if (!validateEmail(email)) {
      this.props.renderError({ error: { message: 'Please use a proper email address' } });
    } else if (!validatePassword(password, passwordVerify)) {
      this.props.renderError({ error: { message: newUser ? 'Passwords must match and be at least 6 characters' : 'Incorrect Password' } });
    } else if (!this.state.username.length && newUser){
      this.props.renderError({ error: { message: 'Please enter a username' } });
    }

  }

  loginUser = (email, password) => {
    const { firebase } = this.props;
    this.props.signIn(firebase, email, password);
  }

  renderSignUp = () => {

    const { email, password, passwordVerify, username } = this.state;
    const { error } = this.props;
    
    return (
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
        /> 
    );
  }

  renderSignIn = () => {

    const { email, password } = this.state;
    const { error, user, signedIn } = this.props;

    return (
      <SignIn
            user={user}
            signedIn={signedIn}
            email={email}
            error={error}
            handleEmail={this.handleEmail}
            handlePassword={this.handlePassword}
            handleSubmit={this.handleSubmit}
            password={password}
          />

      );
  }


  render() {
    const { isNewUser } = this.props;
    return isNewUser ? this.renderSignUp() : this.renderSignIn();
  }
}

const mapState = state => ({
    user: state.user,
    signedIn: state.signedIn,
    error: state.error,
});

const mapDispatch = dispatch => ({
    signIn: (firebase, email, password) => dispatch(signIn(firebase, email, password)),
    signOut: firebase => dispatch(signOut(firebase)),
    isSignedIn: firebase => dispatch(isSignedIn(firebase)),
    createUser: (firebase, email, password, username) => dispatch(createUser(firebase, email, password, username)),
    removeError: () => dispatch(removeError()),
    renderError: error => dispatch(renderError(error)),
});

export default connect(mapState, mapDispatch)(SignInContainer);

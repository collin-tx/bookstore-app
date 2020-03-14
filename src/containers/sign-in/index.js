import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

class SignInContainer extends Component {

  state = {
    signedIn: false,
    user: '',
    fieldValue: '',
    email: '',
    password: '',
    error: ''
  }

  handleEmail = e => {
    this.setState({ email: e.target.value });
  }

  handlePassword = e => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.email.length > 5 && this.state.password.length >= 5) {
      this.setState({ user: this.state.email, email: '', password: '' });
      setTimeout(() => {
        this.loginUser(this.state.user);
        this.props.closeModal();
      }, 100); // janky but bc of this, it now passes along the right action.payload
    } else {
      this.setState({ 
        error: 'Username and password needs to be at least 5 letters'
      });
    }
  }

  loginUser = user => {
    //TODO - USER AUTH STUFF
    this.setState({ signedIn: true, error: ''});
    this.props.signIn(user);
  }

  logoutUser = () => {
    this.setState({ signedIn: false, user: null });
    this.props.signOut();
  }

  render() {
    const { email, error, fieldValue, password, signedIn, user } = this.state;
    return (
      <SignIn
        user={user}
        signedIn={signedIn}
        email={email}
        error={error}
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

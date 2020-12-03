import React from 'react';
import { signOut } from '../../actions';
import { signIn, unwrap, createUser} from '../sign-in/actions';
import { removeError, renderError } from '../../actions';
import { validateEmail, validatePassword } from './helper';


export const handleEmail = e => {
  this.setState({ email: e.target.value });
}

export const handlePassword = e => {
  this.setState({ password: e.target.value });
}

export const handlePasswordVerify = e => {
  this.setState({ passwordVerify: e.target.value });
}

export const handleUsername = e => {
  this.setState({ username: e.target.value })
}

export const handleSubmit = (e, email, password, passwordVerify, newUser = false) => {
  e.preventDefault();

  // console.log('this', e, arguments);
  if (validateEmail(email) && validatePassword(password, passwordVerify)) {
    if (this.props.isNewUser) {
      if (!!this.state.username.length){

        this.props.createUser(this.props.firebase, this.state.email, this.state.password, this.state.username);
        this.props.unwrap(this.props.firebase);
      }
    }
    
    if (!this.props.isNewUser) {
      this.loginUser(this.state.email, this.state.password);
      const user = this.props.firebase.auth().currentUser
      if (!!user) {
        this.props.unwrap(this.props.firebase);
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
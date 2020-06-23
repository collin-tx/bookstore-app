import React, { Component } from 'react';
import SignedIn from '../../components/SignedIn';
import { connect } from 'react-redux';
import { signOut, removeError, renderError, signIn } from '../../actions';
import UserModal from './modal';

class UserModalContainer extends Component {

  // this needs work obvs
  render() {

    const {
      firebase,
      error,
      signOut,
      removeError,
      renderError
    } = this.props;

    return (<UserModal 
      firebase={firebase} 
      error={error} 
      signOut={signOut}
      removeError={removeError}
      renderError={renderError}
    />);
  }
}

const mapState = state => ({
    user: state.user,
    error: state.error
});

const mapDispatch = dispatch => ({
    signOut: firebase => dispatch(signOut(firebase)),
    removeError: () => dispatch(removeError()),
    renderError: error => dispatch(renderError(error))
});

export default connect(mapState, mapDispatch)(UserModalContainer);

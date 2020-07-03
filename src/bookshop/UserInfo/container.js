import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserModal from './modal';
import { signOut, removeError, renderError, signIn } from '../../actions';

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

    return (
      <UserModal 
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

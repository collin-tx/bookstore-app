import React from 'react';
import { connect } from 'react-redux';
import store from '../store';

const SignedIn = (props) => {
  // const user = firebase.auth().currentUser;
  // const logout = () => firebase.auth().signout();
  console.log(props);
  console.log(store.getState());

  const { user, logout } = props;
  return (
    <div> hi
      <h3>Signed in as { user && (user.displayName || user.email) }</h3>
      <p><small>not { user && (user.displayName || user.email) }?</small><button className="btn btn-secondary btn-sm" onClick={logout}>sign out</button></p>
    </div>
  );
}

const mapState = state => ({
  user: state.user,
  state
});

export default connect(mapState)(SignedIn);
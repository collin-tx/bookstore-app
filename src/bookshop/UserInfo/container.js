import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getError } from '../../actions/selectors';
import UserModal from './modal';
import {
  signOut,
  removeError as removeErrorAction,
  renderError as renderErrorAction
} from '../../actions';

const UserModalContainer = ({
  firebase
}) => {
  const user = useSelector(getUser);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  const onSignOut = () => dispatch(signOut(firebase));
  const removeError = () => dispatch(removeErrorAction());
  const renderError = error => dispatch(renderErrorAction(error));

  return (
    <UserModal 
      firebase={firebase} 
      error={error} 
      onSignOut={onSignOut}
      removeError={removeError}
      renderError={renderError}
      user={user}
    />);
}

export default UserModalContainer;

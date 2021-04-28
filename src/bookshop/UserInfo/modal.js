import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { signOut } from '../../actions';
import UserHistory from '../UserHistory/modal';
import Favorites from '../Favorites/modal';
import Suggestions from '../Suggestions/modal';

import {
  getUser,
  getError
} from '../../actions/selectors';

const UserModal = props => {

  const { firebase, user, onHide, onSignOut } = props;
  // const renderError = () => {
  //   return (props.error && 
  //     <div className="error">
  //       <p>{props.error.message}</p>
  //     </div>
  // )};

  const username = user && user.displayName;

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { `${username} || badass bookshop user` }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {renderError()} */}
        <p>Thanks for being a bookshopper. Here's a little space for you. You'll be able to see suggestions, previous orders, favorited books and more!</p>
        <div className="d-flex flex-columns justify-content-center">
          <UserHistory firebase={firebase} />
          <Suggestions firebase={firebase} />
          <Favorites firebase={firebase} />
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <button className="btn btn-outline-primary" onClick={onSignOut}>Sign Out</button>
        <button className="btn btn-outline-danger" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}
  
export const UserModalContainer = ({
  firebase
}) => {
  const [ modalShow, setModalShow ] = React.useState(false);
  
  const error = useSelector(getError);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(signOut(firebase));
  }

  return (
    <ButtonToolbar>
      <div>
        <Button variant="primary" id="sign-out-button" className="mr-2" onClick={() => setModalShow(true)}>
          <i className="fa fa-user"></i>
            <small> {user.displayName || ['user']}</small>
        </Button>
      </div>
      <UserModal 
        onHide={() => setModalShow(false)}
        onSignOut={onSignOut}
        show={modalShow}
        firebase={firebase}
        error={error}
        user={user}
      />
    </ButtonToolbar>
  );
}

export default UserModalContainer;

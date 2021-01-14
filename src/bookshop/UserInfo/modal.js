import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { signOut } from '../../actions';
import UserHistory from '../UserHistory/modal';
import Favorites from '../Favorites/modal';
import Suggestions from '../Suggestions/modal';

const UserModal = props => {
  
  const { firebase, user, onHide } = props;  
  // const renderError = () => {
  //   return (props.error && 
  //     <div className="error">
  //       <p>{props.error.message}</p>
  //     </div>
  // )};

  const onSignOut = () => {
    firebase.auth().signOut()
    .then(() => {
      signOut(firebase);
    });
  }

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
  
export const UserModalContainer = props => {
  
  const [ modalShow, setModalShow ] = React.useState(false);

  return (
    <ButtonToolbar>
    
      <div>
        <Button variant="primary" id="sign-out-button" className="mr-2" onClick={() => setModalShow(true)}>
          <i className="fa fa-user" aria-hidden="true"></i>
            <small> {props.user.displayName || ['user']}</small>
        </Button>
      </div>
    
    <UserModal 
      onHide={() => setModalShow(false)}
      show={modalShow}
      firebase={props.firebase}
      error={props.error}
      user={props.user}
    />

    </ButtonToolbar>
  );
}

const mapState = state => {
  return {
    user: state.user,
    error: state.error
  }
}

const mapDispatch = dispatch => {
  return {
    signOut: firebase => dispatch(signOut(firebase))
  }
}

export default connect(mapState, mapDispatch)(UserModalContainer);

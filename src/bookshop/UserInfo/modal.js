import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { signOut } from '../../actions';
import UserHistory from '../UserHistory/modal';

const UserModal = props => {
  
  const { firebase, user, onHide, onSignOut } = props;  
  const renderError = () => {
    return (props.error && 
      <div className="error">
        <p>{props.error.message}</p>
      </div>
  )};

  const username = user && user.displayName;

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { `${username} || badass bookshop user` }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderError()}
        <UserHistory firebase={firebase} />
        a bunch of user stuff will go here soon. like books and suggestions and whatever ? Idk
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
      <Button onClick={onSignOut}>Sign Out</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
export const UserModalContainer = props => {
  
  const [ modalShow, setModalShow ] = React.useState(false);

  const onSignOut = () => {
    props.firebase.auth().signOut()
    .then(() => {
      props.signOut(props.firebase);
    });
  }

  const displayName = props.user && props.user.displayName;

  return (
      <ButtonToolbar>
      
        <div>
            {/* <p className="navLink mr-2">{props.user && props.user.displayName ? props.user.displayName : ''}</p> */}
            <Button variant="primary" id="sign-out-button" className="mr-2" onClick={() => setModalShow(true)}>
                <small>{displayName || '[no user]'}</small>
                {/* maybe a user icon here? */}
            </Button>
        </div>
      
      <UserModal 
          onHide={() => setModalShow(false)}
          onSignOut={onSignOut}
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

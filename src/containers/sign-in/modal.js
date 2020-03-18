import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import SignInContainer from './index';
import { signOut } from '../../actions';

const SignInModal = props => {
  
  const [ isNewUser, setIsNewUser ] = React.useState(true);
  
  const renderError = () => {
    return (props.error && 
      <div className="error">
        <p>{props.error.message}</p>
      </div>
  )};

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { isNewUser ? 'Sign Up' : 'Sign In' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderError()}
        <SignInContainer firebase={props.firebase} isNewUser={isNewUser} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        {
          isNewUser ? (
            <p>Already have an account? <a className="modal-sign-link" onClick={() => setIsNewUser(false)}>sign in</a></p>) : (
            <p>Don't have an account? <a className="modal-sign-link" onClick={() => setIsNewUser(true)}>sign up</a></p>)
        }
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
export const SignInModalContainer = props => {
  
  const [ modalShow, setModalShow ] = React.useState(false);

  const onSignOut = () => {
    props.firebase.auth().signOut()
    .then(() => {
      props.signOut(props.firebase);
    });
  }

  return (
      <ButtonToolbar>
      
        { !!props.signedIn ? (
          // if a user has logged in -- display username above 'sign out' button
            <div>
                <p className="navLink mr-2">{props.user && props.user.displayName ||props.user && props.user.email || ''}</p>
                <Button variant="primary" id="sign-out-button" className="mr-2" onClick={() => onSignOut()}>
                    <small>sign out</small>
                </Button>
            </div> ) 
            : (
          // if a user has not logged in -- just display a sign in button that opens up the modal
            <Button variant="primary" onClick={() => setModalShow(true)} id="header-sign-in" className="navLink mr-1">
                sign in
            </Button> )
        }
      
      <SignInModal 
          onHide={() => setModalShow(false)}
          show={modalShow}
          firebase={props.firebase}
          error={props.error}
      />
      </ButtonToolbar>
  );
}

const mapState = state => {
    return {
        user: state.user,
        signedIn: state.signedIn,
        error: state.error
    }
}

const mapDispatch = dispatch => {
    return {
        signOut: firebase => dispatch(signOut(firebase))
    }
}

export default connect(mapState, mapDispatch)(SignInModalContainer);

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import SignInContainer from './index';
import { signOut } from '../../actions';

const SignInModal = props => (
  <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Sign In
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <SignInContainer closeModal={props.onHide} />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);
  
export const SignInModalContainer = props => {
const [modalShow, setModalShow] = React.useState(false);
    return (
        <ButtonToolbar>
        
          { !!props.signedIn ? (
              <div>
                  <p className="navLink mr-2">{props.user}</p>
                  <Button variant="primary" id="sign-out-button" className="mr-2" onClick={() => props.signOut()}>
                      <small>sign out</small>
                  </Button>
              </div> ) : (
              <Button variant="primary" onClick={() => setModalShow(true)} 
              id="header-sign-in" className="navLink mr-1">
                  sign in
              </Button> )
          }
        
        <SignInModal 
            onHide={() => setModalShow(false)}
            show={modalShow}
        />
        </ButtonToolbar>
    );
}

const mapState = state => {
    return {
        user: state.user,
        signedIn: state.signedIn
    }
}

const mapDispatch = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapState, mapDispatch)(SignInModalContainer);

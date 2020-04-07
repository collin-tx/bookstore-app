import React from 'react';
import { SignInModal } from '../sign-in/modal';
import SignInContainer from '../sign-in/index';
import { connect } from 'react-redux';
import { signOut } from '../../actions';
import { Modal } from 'react-bootstrap';

export const OnStartModal = props => {
  
    const [ isNewUser, setIsNewUser ] = React.useState(true);
    
    const renderError = () => {
      return (props.error && 
        <div className="error">
          <p>{props.error.message}</p>
        </div>
    )};
  
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
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
              <p>Already have an account? <button className="modal-sign-link" onClick={() => setIsNewUser(false)}>sign in</button></p>) : (
              <p>Don't have an account? <button className="modal-sign-link" onClick={() => setIsNewUser(true)}>sign up</button></p>)
          }
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer> 
       
      </Modal>
    );
  }

const OnStartModalContainer = props => {

    return (
        <OnStartModal
            firebase={props.firebase}
            error={props.error}
            show={!props.user}
        />
    )
}

const mapState = state => ({
    error: state.error,
    user: state.user
});

const mapDispatch = dispatch => ({
    // signIn: dispatch(signIn())
});

export default connect(mapState)(OnStartModalContainer);
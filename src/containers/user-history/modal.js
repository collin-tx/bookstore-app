import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import UserHistoryContainer from './index';

const UserHistoryModal = props => {
    // render error fx
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Purchase History
        </Modal.Title>
        {/* renderErrors() */}
      </Modal.Header>
      <Modal.Body>
        <UserHistoryContainer firebase={props.firebase} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
export const UserHistoryModalContainer = props => {
  
  const [ modalShow, setModalShow ] = React.useState(false);

  return (
      <ButtonToolbar>
            <Button variant="primary" onClick={() => setModalShow(true)} id="show-purchase-history" className="navLink mr-1">
                Past Orders
            </Button> 
        <UserHistoryModal 
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
        userHistory: state.userHistory,
        error: state.error
    }
}

const mapDispatch = dispatch => {
    return {
        // will I need this?
    }
}

export default connect(mapState, mapDispatch)(UserHistoryModalContainer);

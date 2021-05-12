import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

import UserHistory from './index';
import { getHistory } from '../../library/selectors';

const UserHistoryModal = ({
  onHide,
  show,
  userHistory
}) => (
  <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Purchase History
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <UserHistory userHistory={userHistory} />
    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-between">
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export const UserHistoryModalContainer = () => {

  const [ modalShow, setModalShow ] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button variant="primary" onClick={() => setModalShow(true)} id="show-purchase-history" className="navLink mr-1">
        past orders
      </Button> 
      <UserHistoryModal 
        onHide={() => setModalShow(false)}
        show={modalShow}
        userHistory={useSelector(getHistory)}
      />
    </ButtonToolbar>
  );
}

export default UserHistoryModalContainer;

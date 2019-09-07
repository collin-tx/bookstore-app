import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

const CheckoutModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Checkout Page
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Thanks for shopping with us!</h4>
            <p>Your total is ${props.subtotal.toFixed(2)} plus tax.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export const Checkout = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)} 
        className="btn btn-success float-right" id="checkout-btn">
          checkout
        </Button>
  
        <CheckoutModal 
          show={modalShow}
          onHide={() => setModalShow(false)}
          subtotal = {props.subtotal}
        />
      </ButtonToolbar>
    );
  }
  
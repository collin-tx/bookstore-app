import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

const CheckoutModal = props => {
  const { 
    books = [],
    subtotal,
    onHide = () => {},
  } = props;
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
            <p id="checkout-subtotal">Your total is ${subtotal.toFixed(2)} plus tax.</p>
            <ul className="list-group checkout-list">
              {books}
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export const Checkout = ({ books, subtotal }) => {
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
          subtotal = {subtotal}
          books = {books}
        />
      </ButtonToolbar>
    );
  }
  
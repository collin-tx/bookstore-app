import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

const CheckoutModal = props => (
  <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Checkout Page
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Thanks for shopping with us!</h4>
      <p id="checkout-subtotal">Your total is ${props.subtotal.toFixed(2)} plus tax.</p>
      <ul className="list-group checkout-list">
        {props.books}
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <div>
        Checking out as {props.user || 'guest'}
      </div>
      <Button onClick={() => alert('confirm your purchase?')}>Confirm</Button>
      <Button className="btn btn-danger" onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);
  
  export const Checkout = ({ books, subtotal, user }) => {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)} 
        className="btn btn-success float-right" id="checkout-btn">
          checkout
        </Button>
        
        <CheckoutModal 
          books = {books}
          onHide={() => setModalShow(false)}
          show={modalShow}
          subtotal = {subtotal}
          user={user}
        />
      </ButtonToolbar>
    );
  }
  
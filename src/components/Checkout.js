import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import CheckedOut from './CheckedOut';
import store from '../store';
import { checkOut } from '../actions';

const CheckoutModal = props => {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        { props.user ? `Thanks for shopping with us, ${props.user}!` : `Thanks for shopping with us!` }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          !props.checkedOut ? (
            <ul className="list-group checkout-list">
              {props.books}
            </ul>
          ) : (
            <CheckedOut />
          )
        }
      </Modal.Body>
      <Modal.Footer style={{ width: '100%' }}>

        {
          props.checkedOut ? (
            <Button className="btn btn-success" onClick={() => { props.setCheckedOut(false); store.dispatch(checkOut(props.firebase, props.cart, props.subtotal.toFixed(2))) }}>Ok</Button>
          ) : (
            <div>
              <p className="float-left">Your total is ${props.subtotal.toFixed(2)} plus tax</p> 
               | 
              <p className="float-right">Checking out as {props.user || 'guest'}</p>
              <Button className="btn btn-success" onClick={() => props.setCheckedOut(true)}>Confirm</Button>
              <Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
            </div>
          )
        }

      </Modal.Footer>
    </Modal>
  );
}

  export const Checkout = ({ books, cart, firebase, subtotal, user }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [checkedOut, setCheckedOut] = React.useState(false);
  
    return (
      <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)} 
        className="btn btn-success float-right" id="checkout-btn">
          checkout
        </Button>

          <CheckoutModal 
            books={books}
            cart={cart}
            firebase={firebase}
            onHide={() => setModalShow(false)}
            show={modalShow}
            checkedOut={checkedOut}
            setCheckedOut={setCheckedOut}
            subtotal = {subtotal}
            user={user}
          /> 
        
      </ButtonToolbar>
    );
  }

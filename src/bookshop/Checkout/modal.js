import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

import CheckedOut from './CheckedOut';
import Checkout from './index';

import { checkOut } from '../../actions';
import store from '../../store';

const CheckoutModal = props => {
  const renderError = () => {
    return (props.error && 
      <div className="error">
        <p>{props.error.message}</p>
      </div>
  )};

  const onCheckout = () => {
    props.setCheckedOut(false);
    store.dispatch(checkOut(props.firebase, props.cart, props.subtotal.toFixed(2)));
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        { props.user ? `Thanks for shopping with us, ${props.user && props.user.displayName}!` : `Thanks for shopping with us!` }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderError()}
        {
          !props.checkedOut ? (
            <Checkout books={props.books} />
          ) : (
            <CheckedOut />
          )
        }
      </Modal.Body>
      <Modal.Footer style={{ width: '100%' }}>

        {
          props.checkedOut ? (
            <Button className="btn btn-success" onClick={() => onCheckout()}>Ok</Button>
          ) : (
            <div>
              <p className="float-left">Your total is ${props.subtotal.toFixed(2)} plus tax</p> 
               | 
              <p className="float-right">Checking out as {props.user.displayName || 'guest'}</p>
              <Button className="btn btn-success" onClick={() => props.setCheckedOut(true)}>Confirm</Button>
              <Button className="btn btn-danger" onClick={props.onHide}>Cancel</Button>
            </div>
          )
        }

      </Modal.Footer>
    </Modal>
  );
}
  
export const CheckoutModalContainer = props => {
  
    const [modalShow, setModalShow] = React.useState(false);
    const [checkedOut, setCheckedOut] = React.useState(false);
    const cart = store.getState().cart;
    const user = store.getState().user;

    return (
        <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)} 
            className="btn btn-success float-right" id="checkout-btn"
        >
            checkout
        </Button>

            <CheckoutModal 
                books={props.books}
                cart={cart}
                firebase={props.firebase}
                onHide={() => setModalShow(false)}
                show={modalShow}
                checkedOut={checkedOut}
                setCheckedOut={setCheckedOut}
                subtotal = {props.subtotal}
                user={user}
            /> 
        
        </ButtonToolbar>
    );
}

export default connect()(CheckoutModalContainer);
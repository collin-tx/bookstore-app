import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

import CheckedOut from './CheckedOut';
import Checkout from './index';

import { checkOut } from '../../actions';
import { getUser, getCart } from '../../actions/selectors';
import store from '../../store';

const CheckoutModal = props => {

  const renderError = () => {
    return (props.error && 
      <div className="error">
        <p>{props.error.message}</p>
      </div>
  )};

  const [checkedOut, setCheckedOut] = React.useState(false);

  const onCheckout = () => {
    setCheckedOut(false);
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
          !checkedOut ? (
            <Checkout books={props.books} />
          ) : (
            <CheckedOut />
          )
        }
      </Modal.Body>
      <Modal.Footer style={{ width: '100%' }}>

        {
          checkedOut ? (
            <Button className="btn btn-success" onClick={() => onCheckout()}>Ok</Button>
          ) : (
            <div 
              className="d-flex flex-columns justify-content-between align-items-center" 
              style={{ width: '100%' }}
            >
              <p style={{ margin: '0' }}>
                Your total is ${props.subtotal.toFixed(2)} plus tax
              </p> 
              <div className="d-flex flex-columns justify-content-between">
                <button 
                  style={{ marginRight: '10px' }}
                  className="btn btn-success"
                  onClick={() => setCheckedOut(true)}
                >
                  Confirm
                </button>
                <button className="btn btn-danger" onClick={props.onHide}>
                  Cancel
                </button>
              </div>
            </div>
          )
        }

      </Modal.Footer>
    </Modal>
  );
}
  
export const CheckoutModalContainer = props => {
  
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button variant="primary" onClick={() => setModalShow(true)} 
          className="btn btn-success float-right" id="checkout-btn"
      >
          checkout
      </Button>

      <CheckoutModal 
        books={props.books}
        cart={getCart(store.getState())}
        firebase={props.firebase}
        onHide={() => setModalShow(false)}
        show={modalShow}
        subtotal = {props.subtotal}
        user={getUser(store.getState())}
      /> 
    </ButtonToolbar>
  );
}

export default connect()(CheckoutModalContainer);
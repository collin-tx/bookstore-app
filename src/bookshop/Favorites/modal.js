import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

import { getFavorites } from '../../actions/selectors';

import Favorites from './index';

const FavoritesModal = props => {
    // render error fx goes here
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Favorites
        </Modal.Title>
        {/* renderErrors() */}
      </Modal.Header>
      <Modal.Body>
          <Favorites Favorites={props.favorites} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
export const FavoritesModalContainer = props => {
  
  const [ modalShow, setModalShow ] = React.useState(false);
  return (
      <ButtonToolbar>
            <Button variant="primary" onClick={() => setModalShow(true)} id="show-purchase-history" className="navLink mr-1">
                Favorites
            </Button> 
        <FavoritesModal 
            onHide={() => setModalShow(false)}
            show={modalShow}
            firebase={props.firebase}
            error={props.error}
            Favorites={props.favorites}
        />
      </ButtonToolbar>
  );
}

const mapState = state => {
    return {
        user: state.user,
        favorites: getFavorites(state),
        error: state.error
    }
}

export default connect(mapState)(FavoritesModalContainer);

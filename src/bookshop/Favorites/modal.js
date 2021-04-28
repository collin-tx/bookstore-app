import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { getFavorites } from '../../actions/selectors';
import Favorites from './index';

const FavoritesModal = ({
  favorites,
  onHide,
  show
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Favorites
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Favorites Favorites={favorites} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
export const FavoritesModalContainer = props => {
  
  const [ modalShow, setModalShow ] = React.useState(false);
  
  const favorites = useSelector(getFavorites);

  return (
    <ButtonToolbar>
      <Button variant="primary" onClick={() => setModalShow(true)} id="show-purchase-history" className="navLink mr-1">
        favorites
      </Button> 
      <FavoritesModal 
        onHide={() => setModalShow(false)}
        show={modalShow}
        favorites={favorites}
      />
    </ButtonToolbar>
  );
}

export default FavoritesModalContainer;

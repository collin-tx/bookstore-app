import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { 
  getError,
  getSuggestions
} from '../../library/selectors';

import Suggestions from './index';

const SuggestionsModal = ({
  onHide,
  show,
  suggestions
}) => {
    // render error fx goes here
  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Suggestions
        </Modal.Title>
        {/* renderErrors() */}
      </Modal.Header>
      <Modal.Body>
          <Suggestions suggestions={suggestions} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
export const SuggestionsModalContainer = () => {
  
  const [ modalShow, setModalShow ] = React.useState(false);
  
  const suggestions = useSelector(getSuggestions);
  const error = useSelector(getError);

  return (
    <ButtonToolbar>
      <Button variant="primary" onClick={() => setModalShow(true)} id="show-purchase-history" className="navLink mr-1">
        suggestions
      </Button>
      <SuggestionsModal 
        onHide={() => setModalShow(false)}
        show={modalShow}
        error={error}
        suggestions={suggestions}
      />
    </ButtonToolbar>
  );
}

export default SuggestionsModalContainer;

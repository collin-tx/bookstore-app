import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

import { getSuggestions } from '../../actions/selectors';

import Suggestions from './index';

const SuggestionsModal = props => {
    // render error fx goes here
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Suggestions
        </Modal.Title>
        {/* renderErrors() */}
      </Modal.Header>
      <Modal.Body>
          <Suggestions suggestions={props.suggestions} />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
export const SuggestionsModalContainer = props => {
  
  const [ modalShow, setModalShow ] = React.useState(false);
  return (
      <ButtonToolbar>
            <Button variant="primary" onClick={() => setModalShow(true)} id="show-purchase-history" className="navLink mr-1">
                suggestions
            </Button> 
        <SuggestionsModal 
            onHide={() => setModalShow(false)}
            show={modalShow}
            firebase={props.firebase}
            error={props.error}
            suggestions={props.suggestions}
        />
      </ButtonToolbar>
  );
}

const mapState = state => {
    return {
        user: state.user,
        suggestions: getSuggestions(state),
        error: state.error
    }
}

export default connect(mapState)(SuggestionsModalContainer);

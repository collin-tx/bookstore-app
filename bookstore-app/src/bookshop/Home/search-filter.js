import React, { useState } from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_SEARCH_FILTER,
  SEARCH_FILTER_CAN_BUY,
  SEARCH_FILTER_GENRE,
  SEARCH_FILTER_TYPE
} from '../../library/constants';
import { getSearchFilterParams } from '../../library/selectors';
import SearchFilterForm from './form.search-filter';

export const SearchFilter = () => {

  const [ modalShow, setModalShow ] = useState(false);
  const dispatch = useDispatch();

  const params = useSelector(getSearchFilterParams);

  const handleCanBuy = e => {
    dispatch({
      type: SEARCH_FILTER_CAN_BUY,
      payload: !params.canBuy ?? e.target.value
    });
  }

  const handleGenre = e => {
    dispatch({
      type: SEARCH_FILTER_GENRE,
      payload: !!e.target.value ? e.target.value : null
    });
  }

  const handleType = e => {
    dispatch({
      type: SEARCH_FILTER_TYPE,
      payload: !!e.target.value ? e.target.value : null
    });
  }

  const onClickSave = (e) => {
    e.preventDefault();
    setModalShow(false);
    // TODO:
    // should really be here that dispatches the filters right?
  }

  const onClickCancel = (e) => {
    e.preventDefault();
    setModalShow(false);
    
    // TODO: improve this flow
    // this just clears the filter
    dispatch({
      type: CLEAR_SEARCH_FILTER
    });
  }

  return (
    <ButtonToolbar id="search-filter__button">
      <Button onClick={() => setModalShow(true)} id="show-search-filter" className="navLink mr-1 btn btn-secondary btn-sm">
        <i className="fa fa-filter"></i>
      </Button>
      <Modal show={modalShow} onHide={()=>setModalShow(false)}>
        <SearchFilterForm
          canBuy={useSelector(getSearchFilterParams).canBuy}
          handleCanBuy={handleCanBuy}
          handleGenre={handleGenre}
          handleType={handleType}
          onClickCancel={onClickCancel}
          onClickSave={onClickSave}
          parameters={params}
        />
      </Modal>
    </ButtonToolbar>
  );
}

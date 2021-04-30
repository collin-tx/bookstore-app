import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchResultsFilter } from '../../entities/books';
import Home from './Home';

import { quote } from '../../utils/helper';
import { 
    addBookToCart as addBookToCartAction,
    fetchBooks as fetchBooksAction 
} from '../../entities/books';
import { 
    getBooks,
    getError,
    getQueries,
    getUser,
    getNoBooksFound,
    getLoading,
    getSearchFilterParams
} from '../../library/selectors';
import { isLoading as isLoadingAction } from '../../library';

const HomeContainer = ({
  firebase
}) => {
  const [ term, setTerm ] = React.useState('');
  const [ searched, setSearched ] = React.useState(false);
  
  const queries = useSelector(getQueries) ?? [];
  const books = useSelector(getBooks);
  const user = useSelector(getUser);
  const noBooks = useSelector(getNoBooksFound);
  const error = useSelector(getError);
  const loading = useSelector(getLoading);
  const params = useSelector(getSearchFilterParams);

  const dispatch = useDispatch();

  const handleChange = e => setTerm(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    searchForBooks(term, params);
    setTerm('');
  }

  const setLoading = bool => dispatch(isLoadingAction(bool));

  const addToCart = (e, index) => {
      addBookToCartAction(firebase, books[index], user)(dispatch);
  }

  const defaultFilter = {
    canBuy: false,
    genre: null,
    type: null
  }

  const searchForBooks = (query, filter = defaultFilter) => {
    setSearched(true);
    fetchBooksAction(query, firebase, setLoading, filter, queries)(dispatch);
  }

  return (
    <Home
      addToCart={addToCart}
      books={books}
      error={error}
      firebase={firebase}
      loading={loading}
      noBooks={noBooks}
      term={term}
      quote={quote}
      searched={searched}
      searchParams={params}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default HomeContainer;

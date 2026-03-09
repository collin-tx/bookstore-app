import React from 'react';
import Suggestions from './Suggestions';
import { generateKey } from '../../utils/helper';

const SuggestionsContainer = ({ suggestions = {} }) => {
// TODO: massive styling/flow changes
  const suggestionsListArr = Array.isArray(suggestions) ? suggestions : Object.keys(suggestions).map((p, i) => suggestions[p]);
  
  const suggestionsList = suggestionsListArr.map((book, index) => {

    return (
    <li className="list-group-item" key={generateKey(index)}>
      {book}
    </li>
    );
  });

  return (
    suggestionsListArr.length ? (
      <Suggestions suggestionsList={suggestionsList} />
      ) : (
      <p><em>No suggestions yet!</em></p>
    )
  );
};

export default SuggestionsContainer;

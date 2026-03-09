import React from 'react';

const Suggestions = ({
  suggestionsList
}) => (
  <ul className="list-group">
    {suggestionsList}
  </ul>
);

export default Suggestions;
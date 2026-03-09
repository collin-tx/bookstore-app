import React from 'react';

const Favorites = ({
  favoritesList
}) => (
  <ul className="list-group">
    {favoritesList}
  </ul>
);

export default Favorites;
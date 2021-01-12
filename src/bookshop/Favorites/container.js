import React from 'react';
import Favorites from './Favorites';
import { generateKey } from '../../utils/helper';

const FavoritesContainer = ({ favorites = {} }) => {
// TODO: massive styling/flow changes
  const favoritesListArr = Array.isArray(favorites) ? favorites : Object.keys(favorites).map((p, i) => favorites[p]);
  
  const favoritesList = favoritesListArr.map((book, index) => {

    return (
    <li className="list-group-item" key={generateKey(index)}>
      {book}
    </li>
    );
  });

  return (
    favoritesListArr.length ? (
      <Favorites favoritesList={favoritesList} />
      ) : (
      <p><em>No Favorites yet!</em></p>
    )
  );
};

export default FavoritesContainer;

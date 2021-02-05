import React, { useState } from 'react';
import Book from './Book';

const BookContainer = props => {
    
    // TODO: call action to read user fb -- if any of these books match the ones they've favorited, it's favorited prop = true
    const [ favorited, setFavorited ] = useState(false) 
    const onClickFavorite = () => {
        // TODO: dispatch action to update boolean value on book of users fb
        setFavorited(!favorited);
    };

    return (
        <Book {...props} favorited={favorited} onClickFavorite={onClickFavorite} />
    );
}

export default BookContainer;

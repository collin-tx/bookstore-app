import React from 'react';

const Books = ({
  bookList = [],
}) => (
  <ul className="list-group" id="bookList">
    {bookList}
  </ul>
);


export default Books;

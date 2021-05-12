import React from 'react';
import UserHistory from './UserHistory';
import { formatDate, generateKey } from '../../utils/helper';

const UserHistoryContainer = ({ userHistory = {} }) => {
// TODO: massive styling/flow changes
  const purchaseListArr = (Array.isArray(userHistory) ? userHistory : Object.keys(userHistory).map((p, i) => userHistory[p])).reverse();

  const purchaseList = purchaseListArr.map((purchase, index) => {
    
    const orderItemsArr = Array.isArray(purchase.order) ? purchase.order : Object.keys(purchase.order).map(o => purchase.order[o]);
    
    const orderItems = orderItemsArr.map((book, i) => {
    return (
      <li className="list-group-item" key={generateKey(i)}>
        {book.book.volumeInfo && book.book.volumeInfo.title}
        {" by "}
        {book.book.volumeInfo && book.book.volumeInfo.authors && book.book.volumeInfo.authors[0]}
      </li>
      );
      });

    return (
    <li className="list-group-item" key={generateKey(index)}>
      <h5>{formatDate(purchase.date)}</h5> 
      <p>Subtotal: ${purchase.subtotal}</p>
      <ul className="list-group">
        {orderItems}
      </ul>
    </li>
    );
  });

  return (
    purchaseListArr.length ? (
      <UserHistory purchaseList={purchaseList} />
      ) : (
      <p><em>No past purchases yet!</em></p>
    )
  );
};

export default UserHistoryContainer;

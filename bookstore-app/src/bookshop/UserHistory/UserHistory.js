import React from 'react';

const UserHistory = ({
  purchaseList
}) => (
  <ul className="list-group">
    {purchaseList}
  </ul>
);

export default UserHistory;
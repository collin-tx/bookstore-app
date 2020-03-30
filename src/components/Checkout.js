import React from 'react';

const Checkout = ({ books }) => {
  return (
    <ul className="list-group checkout-list">
      {books}
    </ul>
  );
}

export default Checkout;

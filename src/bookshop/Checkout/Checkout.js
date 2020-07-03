import React from 'react';

const Checkout = ({ books }) => (
  <ul className="list-group checkout-list">
    {books}
  </ul>
);

export default Checkout;

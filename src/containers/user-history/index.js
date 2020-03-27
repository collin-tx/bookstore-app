import React from 'react';
import { generateKey } from '../../utils/helper';

const UserHistory = ({ userHistory }) => {
    const purchaseList = userHistory && userHistory.map((purchase, index) => {
        const orderItems = purchase.order.map((book, i) => {
            return (
                <li className="list-group-item" key={generateKey(i)}>
                    {book.volumeInfo && book.volumeInfo.title} 
                    {/* somehow it's not getting any of this info.... */}
                    {book.volumeInfo && book.volumeInfo.authors[0]}
                </li>
            );
        });
        return (
            <li className="list-group-item" key={generateKey(index)}>
                Subtotal: ${purchase.subtotal}------------------{purchase.date}
                <ul className="list-group">
                    {orderItems}
                </ul>

            </li>
        );
    });
    
    return (
        <ul className="list-group">
            {purchaseList}
        </ul>
    );
};

export default UserHistory;

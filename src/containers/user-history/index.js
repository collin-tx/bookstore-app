import React from 'react';
import { generateKey } from '../../utils/helper';

const UserHistory = ({ userHistory }) => {
    
    const purchaseList = userHistory && userHistory.map((order, index) => {
        const orderItems = order.order.map((book, i) => {
            return (
                <li className="list-group-item" key={generateKey(i)}>
                    {book.volumeInfo.title}
                    {book.volumeInfo.authors[0]}
                </li>
            );
        });
        return (
            <li className="list-group-item" key={generateKey(index)}>
                Subtotal: ${order.subtotal}------------------{order.date}
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

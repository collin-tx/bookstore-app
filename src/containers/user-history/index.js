import React from 'react';
import { generateKey } from '../../utils/helper';

const UserHistory = ({ userHistory = [] }) => {
    // TODO: massive styling/flow changes
    const purchaseListArr = Array.isArray(userHistory) ? userHistory : Object.keys(userHistory).map((p, i) => userHistory[p]);
        const purchaseList = purchaseListArr.map((purchase, index) => {
            const orderItemsArr = Array.isArray(purchase.order) ? purchase.order : Object.keys(purchase.order).map(o => purchase.order[o]);
            const orderItems = orderItemsArr.map((book, i) => {
                return (
                    <li className="list-group-item" key={generateKey(i)}>
                        {book.book.volumeInfo && book.book.volumeInfo.title}
                        {" by "}
                        {book.book.volumeInfo && book.book.volumeInfo.authors[0]}
                        {/* more book info? */}
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
            !!userHistory.length ? (
                <ul className="list-group">
                    {purchaseList}
                </ul>
            ) : (
                <p><em>No past purchases yet!</em></p>
            )
    );
};

export default UserHistory;

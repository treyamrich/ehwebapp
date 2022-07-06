import React, { useState } from 'react';

function POReceivedItems({ rcvItems, setRcvItems }) {

    return(
        <div>
            <h3>Received Items</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Date Received</th>
                        <th>Qty. Received</th>
                    </tr>
                </thead>
                <tbody>
                {rcvItems.length === 0 ? <tr><td colSpan="3">No Items Received Yet</td></tr> : null}
                {rcvItems.map((item, idx)=>(
                    <tr key={"rcv-" + idx}>
                        <td>{item.itemCode}</td>
                        <td>{item.receivedDate}</td>
                        <td>{item.numReceived}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default POReceivedItems;
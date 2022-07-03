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
                {rcvItems.map((item, idx)=>(
                    <tr key={"rcv-" + idx}>
                        <td>{item.itemCode}</td>
                        <td><input type="date" 
                                value={item.receivedDate}
                                onChange={(e)=>setRcvItems(rcvItems.map((elm, index)=>
                                    idx === index ? {...elm,
                                        receivedDate: e.target.value
                                    } : elm
                                ))}
                            />
                        </td>
                        <td>
                            <div>
                                <input type="number" name="amt-recv"
                                    onChange={(e)=>setRcvItems(rcvItems.map((elm, index)=>
                                        idx === index ? {...elm,
                                            numReceived: e.target.value
                                        } : elm
                                    ))}
                                    value={item.numReceived}
                                    placeholder="Enter amount received"
                                    min="0"
                                    step="1"
                                />
                                <button type="button"
                                    onClick={()=>setRcvItems(rcvItems.map((elm, index)=>
                                        idx === index ? {...elm,
                                            numReceived: item.numPurchased
                                        } : elm
                                    ))}> Max
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button>Add to Inventory</button>
        </div>
    );
}

export default POReceivedItems;
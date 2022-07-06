import React, { useState } from 'react';

const initAdjState = {
    editIdx: -1,
    adjAmt: 0,
    reason: ""
}
function POReceivedItems({ rcvItems, setRcvItems }) {
    //Adjustments
    const [adj, setAdj] = useState(initAdjState);

    const {editIdx, adjAmt, reason} = adj;
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
                        <td>{editIdx !== idx ? 
                            <div>{item.numReceived}
                                <button onClick={()=>setAdj({...adj, editIdx: idx})}>
                                    Tool Box
                                </button>
                            </div> :
                            <div>
                                <form>
                                    <label>Adjustment</label>
                                    <input type="number"
                                        step="1"
                                        onChange={(e)=>setAdj({...adj, adjAmt: e.target.value})}
                                        value={adjAmt}
                                    />
                                    <button type="button" 
                                        onClick={()=>setAdj({...adj, adjAmt: parseInt(adjAmt)+1})}>+</button>
                                    <button type="button"
                                        onClick={()=>setAdj({...adj, adjAmt: adjAmt-1})}>-</button>
                                    <label>Reason</label>
                                    <input type="text" placeholder="Miscounted, lost, etc."
                                        onChange={(e)=>setAdj({...adj, reason: e.target.value})}
                                        value={reason}
                                    />
                                    <button type="button">Confirm</button>
                                    <button type="button"
                                        onClick={()=>setAdj({...adj, editIdx: -1, adjAmt: 0})}>Cancel
                                    </button>
                                </form>
                            </div>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default POReceivedItems;
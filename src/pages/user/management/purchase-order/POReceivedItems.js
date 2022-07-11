import React, { useState } from 'react';
import { formatDate } from '../../../../utility/DateTimeFunctions';
import { POAdjustHistory } from './index';

const initAdjItemState = {
    editIdx: -1,
    adj: {
        adjAmt: 0,
        reason: ""
    }
}
function POReceivedItems({ rcvItems, invItemMap, updateItemsInInventory }) {
    //This component will indirectly adjust the POItems in rcvItems
    console.log(rcvItems);
    //Dereference the adjustment item object 
    const [adjItem, setAdjItem] = useState(initAdjItemState);
    const {editIdx, adj} = adjItem;
    
    function makeAdjustment() {
        //Verify a POItem from the UI was selected and the adjustment amt is meaningful
        if(editIdx < 0 || adj.adjAmt === 0 || adj.adjAmt === "") return;
        
        let adjustedItem = rcvItems[editIdx];
        adjustedItem.numReceived += adj.adjAmt;

        //Add adj to adjustment history
        adj.adjDate = formatDate(new Date());
        adjustedItem.adjustments = adjustedItem.adjustments ? 
            [...adjustedItem.adjustments, adj] : 
            [adj];
        console.log(adjustedItem);
        updateItemsInInventory([adjustedItem], adj.adjAmt);
    }
    function handleAdjustment(adjAmt) {
        //Ensures an adjustment won't make a POItem's qty negative
        adjAmt = adjAmt !== "" ? parseInt(adjAmt) : adjAmt;
        if(rcvItems[editIdx].numReceived + adjAmt < 0) return;
        setAdjItem({...adjItem, adj:{...adj, adjAmt: adjAmt}});
    }

    return(
        <div>
            <h3>Received Items</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Date Received</th>
                        <th>Qty. Received</th>
                        <th>Adjustments</th>
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
                                <button onClick={()=>setAdjItem({editIdx: idx, adj: {
                                        adjAmt: 0, 
                                        reason: ""
                                    }})}>
                                    Tool Box
                                </button>
                            </div> :
                            <div>
                                <form>
                                    <h4>In Stock: {invItemMap.get(item.itemCode).qty}</h4>
                                    <label>Adjustment</label>
                                    <input type="number"
                                        step="1"
                                        onChange={(e)=>handleAdjustment(e.target.value)}
                                        value={adj.adjAmt}
                                    />
                                    <button type="button" 
                                        onClick={()=>handleAdjustment(adj.adjAmt+1)}>+</button>
                                    <button type="button"
                                        onClick={()=>handleAdjustment(adj.adjAmt-1)}>-</button>
                                    <label>Reason</label>
                                    <input type="text" placeholder="Miscounted, lost, etc."
                                        onChange={(e)=>setAdjItem({...adjItem, adj:{...adj, reason: e.target.value}})}
                                        value={adj.reason}
                                    />
                                    <button type="button" 
                                        onClick={()=>{makeAdjustment(); setAdjItem({...adjItem, editIdx: -1});}}>
                                            Confirm
                                    </button>
                                    <button type="button"
                                        onClick={()=>setAdjItem({editIdx: -1, adj: {adjAmt: 0, reason: "", adjDate: ""}})}>
                                            Cancel
                                    </button>
                                </form>
                            </div>
                            }
                        </td>
                        <td>
                            <POAdjustHistory adjustments={item.adjustments}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default POReceivedItems;
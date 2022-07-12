import { POAdjustHistory } from './index';

function POIncomingItems({incItems, setIncItems, updateItemsInInventory}) {
    function handleAddToInv() {
        let poItem, rcvDiff;
        let partialRecv = [];
        for(let i = 0; i < incItems.length; i++) {
            poItem = incItems[i];
            rcvDiff = poItem.numPurchased - poItem.numReceived;
            //If ONLY some of the items were received, make a new POItem
            if(poItem.numReceived > 0 && rcvDiff > 0) {
                partialRecv.push({...poItem, 
                    numPurchased: rcvDiff,
                    numReceived: 0
                });
                poItem.numPurchased = poItem.numReceived;
            }
        }
        console.log([...incItems, ...partialRecv]);
        updateItemsInInventory([...incItems, ...partialRecv]);
    }
    return(
        <div>
            <h3>Incoming Items</h3>
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
                {incItems.length === 0 ? <tr><td colSpan="3">No Incoming Items</td></tr> : null}
                {incItems.map((item, idx)=>(
                    <tr key={"inc-" + idx}>
                        <td>{item.itemCode}</td>
                        <td><input type="date" 
                                value={item.receivedDate}
                                onChange={(e)=>setIncItems(incItems.map((elm, index)=>
                                    idx === index ? {...elm,
                                        receivedDate: e.target.value
                                    } : elm
                                ))}
                            />
                        </td>
                        <td>
                            <div>
                                <input type="number" name="amt-recv"
                                    onChange={(e)=>setIncItems(incItems.map((elm, index)=>
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
                                    onClick={()=>setIncItems(incItems.map((elm, index)=>
                                        idx === index ? {...elm,
                                            numReceived: item.numPurchased
                                        } : elm
                                    ))}> Max
                                </button>
                            </div>
                        </td>
                        <td>
                            <POAdjustHistory adjustments={item.adjustments}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {incItems.length > 0 ? 
                <button type="button" onClick={handleAddToInv}>
                    Add to Inventory
                </button>
            : null
            }
        </div>
    );
}

export default POIncomingItems;
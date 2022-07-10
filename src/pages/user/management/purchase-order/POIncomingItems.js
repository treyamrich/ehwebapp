function POIncomingItems({incItems, setIncItems, updateItemsInInventory}) {
    return(
        <div>
            <h3>Incoming Items</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Date Received</th>
                        <th>Qty. Received</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
            {incItems.length > 0 ? 
                <button type="button" onClick={()=>updateItemsInInventory(incItems)}>
                    Add to Inventory
                </button>
            : null
            }
        </div>
    );
}

export default POIncomingItems;
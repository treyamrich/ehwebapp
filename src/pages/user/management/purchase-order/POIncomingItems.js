import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { updateItems } from '../../../../graphql/mutations';
import { getItems } from '../../../../graphql/queries';

function POIncomingItems({incItems, setIncItems, updatePOItems}) {
    async function addIncToInventory() {
        updatePOItems(incItems);
        for(let i = 0; i < incItems.length; i++) {
            if(incItems[i].numReceived > 0) {
                console.log(incItems[i].itemCode);
                try {
                    const dbResp = await API.graphql({ query: getItems, 
                        variables: {
                            code: incItems[i].itemCode
                        }, 
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    });
                    console.log(dbResp);/*
                    await API.graphql({ query: updateItems, 
                        variables: {
                            input: {
                                
                            }
                        }, 
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    });*/
                } catch(e) {
                    console.log(e);
                }
            }
        }
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
                <button type="button" onClick={addIncToInventory}>
                    Add to Inventory
                </button>
            : null
            }
        </div>
    );
}

export default POIncomingItems;
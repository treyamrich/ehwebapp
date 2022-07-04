import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { updateItems } from '../../../../graphql/mutations';
import { getItems, listItems } from '../../../../graphql/queries';
import { POIncomingItems, POReceivedItems } from './index';
import { formatDate, formatPOItemDate } from '../../../../utility/index';

function PORunDown({poForm, setPOForm, opRes, setOpRes, performOp}) {
    const po = poForm.po;
    const initIncItems = [];
    const initRcvItems = [];
    const POItemMap = new Map();

    //Process the PO items ensuring there are no null fields
    formatPOItemDate(po, false);
    for(let i = 0; i < po.orderedProducts.length; i++) {
        POItemMap.set(po.orderedProducts[i].itemCode, po.orderedProducts[i]);
    }

    //ToDo are the POItems that need to be updated from the user
    //Received Products are the products that have been marked as received
    for(let i = 0; i < po.orderedProducts.length; i++) {
        po.orderedProducts[i].receivedDate ?
            initRcvItems.push(po.orderedProducts[i]) :
            initIncItems.push({...po.orderedProducts[i], 
                receivedDate: formatDate(new Date())
            });
    }
    
    const [incItems, setIncItems] = useState(initIncItems);
    const [rcvItems, setRcvItems] = useState(initRcvItems);
    
    async function updatePOItems(updatedItems) {
        //Use map to update the item received date and qty if the user entered one
        for(let i = 0; i < updatedItems.length; i++) {
            if(updatedItems[i].numReceived > 0) {
                POItemMap.set(updatedItems[i].itemCode, updatedItems[i]);
            }
        }
        let newPOItems = Array.from(POItemMap.values());
        po.orderedProducts = newPOItems;

        //Change empty strings back to null values
        formatPOItemDate(po, true);

        return performOp("edit", po, true);
        //setPOForm({...poForm, po: {...po, orderedProducts: newPOItems}});
    }

    async function addPOItemsToInventory(items) {
        if(!(await updatePOItems(items))) return;
    
        //Track items if they fail to be updated
        let failItems = [];
        let failMsg = "Error: Item(s) ";
        for(let i = 0; i < items.length; i++) {
            if(items[i].numReceived > 0) {
                try {
                    const dbResp = await API.graphql({ query: getItems, 
                        variables: {
                            code: items[i].itemCode
                        }, 
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    });

                    //Update item qty
                    const item = dbResp.data.getItems;
                    item.qty += parseInt(items[i].numReceived);

                    //REMOVE THIS LATER
                    item.createdAt = undefined;
                    item.updatedAt = undefined;

                    await API.graphql({ query: updateItems, 
                        variables: {
                            input: item
                        }, 
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    });
                } catch(e) {
                    console.log(e);
                    failItems.push(items[i].itemCode);
                }
            }
        }
        if(failItems.length > 0) {
            for(let i = 0; i < failItems.length; i++) {
                failMsg += failItems[i];
                if(i !== failItems.length - 1 && failItems.length > 1)
                    failMsg += ", ";
            }
            failMsg += " could not be added to the inventory";
            setOpRes({...opRes, failItems: failItems, failureMsg: failMsg});
        } else {
            setOpRes({...opRes, successMsg: "All items were successfully added."});
        }
    }

    return(
        <div>
            <ul>
               <li>Order#: {po.id}</li> 
               <li>Vendor ID: {po.vendorId}</li>
               <li>Status: {po.isOpen ? "Open" : "Closed"}</li>
               <li>Date: {po.date}</li>
               <li>
                <button type="button" 
                    onClick={()=>setPOForm({...poForm, op: "view-all"})}>Back
                </button>
                </li>
               <li><button type="button" onClick={()=>setPOForm({po: po, op: "edit"})}>Edit Order Items</button></li>
               <li><button type="button" onClick={()=>performOp("remove", po)}>Delete Order</button></li>
               <li><button type="button">Send Order</button></li>
            </ul>
            <h3>Order Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>On Hand</th>
                        <th>Purchased</th>
                        <th>Unit Cost</th>
                        <th>Total Cost</th>
                        <th>Good Until</th>
                    </tr>
                </thead>
                <tbody>
                {po.orderedProducts.map((item, idx)=>(
                    <tr key={"ItemInfo-"+idx}>
                        <td>{item.itemCode}</td>
                        <td>{item.itemName}</td>
                        <td>{item.numReceived}</td>
                        <td>{item.numPurchased}</td>
                        <td>{item.unitCost}</td>
                        <td>{item.totalCost}</td>
                        <td>{item.goodTill ? item.goodTill : "Forever"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <POIncomingItems 
                incItems={incItems} 
                setIncItems={setIncItems}
                addPOItemsToInventory={addPOItemsToInventory}
            />
            <POReceivedItems rcvItems={rcvItems} setRcvItems={setRcvItems}/>
        </div>
    );
}

export default PORunDown;
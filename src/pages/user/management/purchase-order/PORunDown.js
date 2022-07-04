import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../../graphql/queries';
import { updatePurchaseOrder } from '../../../../graphql/mutations';
import { POIncomingItems, POReceivedItems } from './index';
import { formatDate } from '../../../../utility/DateTimeFunctions';

function PORunDown({poForm, setPOForm, opRes, setOpRes, performOp}) {
    const po = poForm.po;
    const initIncItems = [];
    const initRcvItems = [];
    const POItemMap = new Map();

    //Process the PO items ensuring there are no null fields
    for(let i = 0; i < po.orderedProducts.length; i++) {
        if(po.orderedProducts[i].receivedDate === null) {
            po.orderedProducts[i].receivedDate = "";
        }
        if(po.orderedProducts[i].goodTill === null) {
            po.orderedProducts[i].goodTill = "";
        }
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

        //REMOVE THIS LATER
        delete po.createdAt;
        delete po.updatedAt;

        //Convert empty fields back to null
        for(let i = 0; i < po.orderedProducts.length; i++) {
            if(po.orderedProducts[i].goodTill === "") {
                po.orderedProducts[i].goodTill = null;
            }
            if(po.orderedProducts[i].receivedDate === "") {
                po.orderedProducts[i].receivedDate = null;
            }
        }

        try {
            await API.graphql({ query: updatePurchaseOrder, 
                variables: {
                    input: po
                }, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        } catch(e) {
            console.log(e);
            setOpRes({...opRes, errorMsg:"Error: Could not update Purchase Order"});
        }
        setPOForm({...poForm, po: {...po, orderedProducts: newPOItems}});
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
                updatePOItems={updatePOItems}
            />
            <POReceivedItems rcvItems={rcvItems} setRcvItems={setRcvItems}/>
        </div>
    );
}

export default PORunDown;